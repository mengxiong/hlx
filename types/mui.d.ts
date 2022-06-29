import '@mui/material/styles';

declare module '@mui/material/styles' {
  interface TypographyVariants {
    study: React.CSSProperties;
  }
  // allow configuration using `createTheme`
  interface TypographyVariantsOptions {
    study?: React.CSSProperties;
  }
}

// Update the Typography's variant prop options
declare module '@mui/material/Typography' {
  interface TypographyPropsVariantOverrides {
    study: true;
  }
}
