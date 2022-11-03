interface IProps {
  count: number
}

export default function Home(props: IProps) {
  return (
    <>
      <h1>Hello word</h1>
      <h2>Contagem: {props.count}</h2>
    </>
  )
}

export const getServerSideProps = async () => {
  const response = await fetch('http://localhost:3333/pools/count')
  const data = await response.json()

  return { props: { count: data.count } }
}
