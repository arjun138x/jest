export function toUpper(params: string): string {
  return params.toUpperCase();
}

export class StringUtils {
  public toUpperCase(arg: string) {
    // calling toUpper Fn
    return toUpper(arg);
  }
}

export type stringInfo = {
  lowerCase: string;
  upperCase: string;
  characters: string[];
  length: number;
  extraInfo: Object | undefined;
};

export function getStringInfo(arg: string): stringInfo {
  return {
    lowerCase: arg.toLowerCase(),
    upperCase: arg.toUpperCase(),
    characters: Array.from(arg),
    length: arg.length,
    extraInfo: {},
  };
}
