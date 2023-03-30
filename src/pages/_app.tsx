import type { AppProps } from "next/app";
import { globalStyles } from "../styles/global";
import LogoImg from "../assets/LogoShop.png";
import { Container, Header } from "../styles/pages/app";
import Image from "next/image";
globalStyles();

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Container>
      <Header>
        <Image src={LogoImg} alt="logo do site" />
      </Header>
      <Component {...pageProps} />
    </Container>
  );
}
