interface Color {
  primaryMint: string;
  primaryMintDark: string;
  black: string;
  white: string;
  grey: string;
  yellow: string;
  red: string;
  green: string;
  blue: string;
}

interface FontFamily {
  primary: string;
}

export const Colors: Color = {
  primaryMint: "#9AD0C2",
  primaryMintDark: "#2D9596",
  black: "#000000",
  white: "#FFFFFF",
  grey: "#D9D9D9",
  yellow: "#F1FADA",
  red: "#FF0000",
  green: "#00FF00",
  blue: "#0000FF",
};

export const FontFamily: FontFamily = {
  primary: "Roboto",
};
