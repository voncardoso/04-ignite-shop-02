import { ImageContainer, ProductContainer, ProductDatails } from "../../styles/pages/product";
import { useRouter } from "next/router";
import { GetStaticPaths, GetStaticProps } from "next";
import { stripe } from "@/src/lib/stripe";
import Stripe from "stripe";
import Image from "next/image";
import axios from "axios";

interface description{
  product: {
    id: string;
    name: string;
    imageUrl: string;
    price: string;
    description: string
    defaultPriceId: string
  };
}

export default function Product({product}: description) {

  const {isFallback} = useRouter()

  if(isFallback){
    return <p>LOADING....</p>
  }

  async function handleBuyProsuct(){
    try{
      const response = await axios.post('/api/checkout', {
        priceId: product.defaultPriceId
      })

      const {checkoutUrl} = response.data

      window.location.href = checkoutUrl
    }catch{
      alert('falha ao retornar o chekout')
    }
  }

  return (
    <ProductContainer>
      <ImageContainer>
        <Image 
          src={product.imageUrl} 
          width={520}
          height={450}
          alt="" />
      </ImageContainer>

      <ProductDatails>
        <h1>{product.name}</h1>
        <span>{product.price}</span>

        <p>{product.description}</p>

        <button onClick={handleBuyProsuct}>
          Comprar Agora
        </button>
      </ProductDatails>
    </ProductContainer>
  )
}

export const getStaticPaths: GetStaticPaths = async () =>{
  return {
    paths: [
      {params: {id: "prod_NcJl1x7ww79yT0"}}
    ],
    fallback: true
  }
}

export const getStaticProps: GetStaticProps = async ({params}: any) => {

  const productId = params.id

  const product = await stripe.products.retrieve(productId, {
    expand: ['default_price']
  })
  const price = product.default_price as Stripe.Price;

  return{
    props: {
      product:{
        id: product.id,
        name: product.name,
        imageUrl: product.images[0],
        price: new Intl.NumberFormat("pt-br", {
        style: "currency",
        currency: "BRL",
        }).format(Number(price.unit_amount) / 100),
        description: product.description,
        defaultPriceId: price.id
      }
    },
    revalidate: 60 * 60 * 1,
  }
}
