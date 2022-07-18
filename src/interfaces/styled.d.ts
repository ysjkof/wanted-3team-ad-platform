import 'styled-components';

// and extend them!
declare module 'styled-components' {
  export interface DefaultTheme {
    btSelectedColor: string;
    primaryColor: string;
    mainBackgroundColor: string;
    borderColor: string;
    darkFontColor: string;
    lightFontColor: string;
  }
}
