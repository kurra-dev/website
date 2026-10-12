import * as Tabs from "@radix-ui/react-tabs";
import { Trans, useLingui } from "@lingui/react/macro";
import { useEffect, useRef, useState } from "react";

import { SAMPLE_HOST, SAMPLE_REGISTRY_HOST } from "./config";

type Line = { sign: "+" | "-" | " "; text: string };
type Snippet = { id: string; label: string; file: string; lines: Line[] };

const H = SAMPLE_HOST;
const R = SAMPLE_REGISTRY_HOST;

// Real client configuration, one tab per client. Code is not translated. The registries are the ones every tenant
// starts with (npmjs, pypi, crates-io, go-proxy); Docker and Terraform use a registry's own hostname.
const SNIPPETS: readonly Snippet[] = [
  {
    id: "npm",
    label: "npm",
    file: ".npmrc",
    lines: [
      { sign: "-", text: "registry=https://registry.npmjs.org/" },
      { sign: "+", text: `registry=https://${H}/npm/npmjs/` },
      { sign: "+", text: `//${H}/npm/npmjs/:_authToken=\${KURRA_TOKEN}` },
    ],
  },
  {
    id: "pypi",
    label: "pip",
    file: "pip.conf",
    lines: [
      { sign: " ", text: "[global]" },
      { sign: "-", text: "index-url = https://pypi.org/simple/" },
      { sign: "+", text: `index-url = https://${H}/pypi/pypi/simple/` },
    ],
  },
  {
    id: "go",
    label: "Go",
    file: "~/.profile",
    lines: [
      { sign: "-", text: "export GOPROXY=https://proxy.golang.org,direct" },
      { sign: "+", text: `export GOPROXY=https://${H}/go/go-proxy` },
    ],
  },
  {
    id: "cargo",
    label: "Cargo",
    file: ".cargo/config.toml",
    lines: [
      { sign: "+", text: "[source.crates-io]" },
      { sign: "+", text: 'replace-with = "kurra"' },
      { sign: "+", text: "" },
      { sign: "+", text: "[source.kurra]" },
      { sign: "+", text: `registry = "sparse+https://${H}/cargo/crates-io/"` },
    ],
  },
  {
    id: "maven",
    label: "Maven",
    file: "~/.m2/settings.xml",
    lines: [
      { sign: " ", text: "<settings>" },
      { sign: "+", text: "  <mirrors>" },
      { sign: "+", text: "    <mirror>" },
      { sign: "+", text: "      <id>kurra</id>" },
      { sign: "+", text: "      <mirrorOf>*</mirrorOf>" },
      { sign: "+", text: `      <url>https://${H}/maven/releases/</url>` },
      { sign: "+", text: "    </mirror>" },
      { sign: "+", text: "  </mirrors>" },
      { sign: " ", text: "</settings>" },
    ],
  },
  {
    id: "docker",
    label: "Docker",
    file: "shell",
    lines: [
      {
        sign: "+",
        text: `echo "$KURRA_TOKEN" | docker login ${R} -u kurra --password-stdin`,
      },
      { sign: "+", text: `docker pull ${R}/team/app:1` },
    ],
  },
  {
    id: "apk",
    label: "apk",
    file: "/etc/apk/repositories",
    lines: [
      { sign: "-", text: "https://dl-cdn.alpinelinux.org/alpine/v3.20/main" },
      { sign: "+", text: `https://token:kurra_xxxxxxxx@${H}/apk/acme/v3.20/main` },
    ],
  },
  {
    id: "terraform",
    label: "Terraform",
    file: "main.tf",
    lines: [
      { sign: "-", text: 'source  = "terraform-aws-modules/vpc/aws"' },
      { sign: "+", text: `source  = "${R}/acme/vpc/aws"` },
    ],
  },
];

function CopyButton({ text }: { text: string }) {
  const { t } = useLingui();
  const [copied, setCopied] = useState(false);
  const timer = useRef<number | undefined>(undefined);
  useEffect(() => () => window.clearTimeout(timer.current), []);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      window.clearTimeout(timer.current);
      timer.current = window.setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard blocked: the text stays selectable */
    }
  };
  return (
    <button type="button" className="btn btn-ghost btn-sm" onClick={copy}>
      {copied ? t`Copied` : t`Copy`}
      <span className="sr-only" role="status">
        {copied ? t`Configuration copied` : ""}
      </span>
    </button>
  );
}

/** Switching an ecosystem to Kurra is a few lines. One tab per client, real configuration. */
export function SetupTabs() {
  const { t } = useLingui();
  return (
    <Tabs.Root className="code-card" defaultValue={SNIPPETS[0]!.id}>
      <Tabs.List className="code-tabs" aria-label={t`Client`}>
        {SNIPPETS.map((s) => (
          <Tabs.Trigger key={s.id} value={s.id} className="code-tab">
            {s.label}
          </Tabs.Trigger>
        ))}
      </Tabs.List>
      {SNIPPETS.map((s) => (
        <Tabs.Content key={s.id} value={s.id} className="code-panel">
          <div className="code-bar">
            <span className="code-file mono">{s.file}</span>
            <CopyButton
              text={s.lines
                .filter((l) => l.sign !== "-")
                .map((l) => l.text)
                .join("\n")}
            />
          </div>
          <pre className="code" tabIndex={0}>
            <code>
              {s.lines.map((l, i) => (
                <span
                  key={i}
                  className={
                    l.sign === "+" ? "line line-add" : l.sign === "-" ? "line line-remove" : "line"
                  }
                >
                  <span className="line-sign">{l.sign}</span>
                  {l.text || " "}
                </span>
              ))}
            </code>
          </pre>
        </Tabs.Content>
      ))}
      <p className="code-note">
        <Trans>
          Your token goes where the client keeps credentials. Kurra shows a token once, when you
          create it.
        </Trans>
      </p>
    </Tabs.Root>
  );
}
