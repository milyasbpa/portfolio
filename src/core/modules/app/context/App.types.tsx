type ActionMap<M extends { [index: string]: { [key: string]: any } }> = {
  [Key in keyof M]: M[Key] extends undefined
    ? {
        type: Key;
      }
    : {
        type: Key;
        payload: M[Key];
      };
};

// State Collection Types
export interface AppInitialStateType {
  theme: AppTheme;
}

// State Collection Types consist of:
export interface AppTheme {
  mode: "dark" | "light";
}

export enum AppActionEnum {
  // Theme
  SetThemeData = "SetThemeData",
}

// Action Collection Types
export type AppActions = AppThemeActions;

// Action Collection Types consist of:
// Theme
type AppThemePayload = {
  [AppActionEnum.SetThemeData]: AppTheme;
};

export type AppThemeActions =
  ActionMap<AppThemePayload>[keyof ActionMap<AppThemePayload>];
