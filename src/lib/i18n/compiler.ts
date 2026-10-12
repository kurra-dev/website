import { i18n } from "@lingui/core";
import { compileMessage } from "@lingui/message-utils/compileMessage";

// A production build only renders messages a catalog already compiled. The source locale has no catalog (the English
// is in the code), and a language can lack a translation, so those messages arrive as raw ICU text and would print
// "{tenant}" or "{n, plural, ...}" as written. Registering the compiler makes the fallback text format like any other.
// Imported for its effect by the provider and the package entry, so it runs before anything calls `t`.
i18n.setMessagesCompiler(compileMessage);
