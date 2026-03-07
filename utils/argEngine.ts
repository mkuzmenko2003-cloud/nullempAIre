/**
 * ARG puzzle engine — hidden clues, encoded messages, terminal commands.
 */

/** Base64 clue: decodes to "nullempaire" */
export const CLUE_BASE64 = "bnVsbGVtcGFpcmU=";

export function decodeBase64Clue(encoded: string): string {
  if (typeof window === "undefined") return "";
  try {
    return atob(encoded);
  } catch {
    return "";
  }
}

export const ARG_CLUES = [
  { type: "base64", value: "bnVsbGVtcGFpcmU=", hint: "Decode to reveal project name" },
  { type: "terminal", value: "scan_null_cluster", hint: "Run in hidden terminal" },
  { type: "terminal", value: "decode_signal", hint: "Run in hidden terminal" },
  { type: "terminal", value: "open_redacted_archive", hint: "Run in hidden terminal" },
  { type: "tag", value: "null_entity", hint: "Hidden archive tag" },
  { type: "tag", value: "redacted", hint: "Some archives are redacted" },
];

export const HIDDEN_TERMINAL_COMMANDS: Record<string, { description: string; loreCondition?: string }> = {
  help: {
    description: "List available commands",
  },
  scan_null_cluster: {
    description: "Scan the null cluster for anomalies",
    loreCondition: "scan_null_cluster",
  },
  decode_signal: {
    description: "Decode the primary signal",
    loreCondition: "decode_signal",
  },
  open_redacted_archive: {
    description: "Attempt to open redacted archive",
    loreCondition: "open_redacted_archive",
  },
};

export function isKnownCommand(cmd: string): boolean {
  return cmd in HIDDEN_TERMINAL_COMMANDS;
}
