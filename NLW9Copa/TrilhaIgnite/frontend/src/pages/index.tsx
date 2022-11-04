interface IProps {
  count: number
}

export default function Home(props: IProps) {
  return (
    <div className="text-violet-500 font-bold text-4xl">
      <h1>Hello word</h1>
      <h2>Contagem: {props.count}</h2>
    </div>
  )
}

export const getServerSideProps = async () => {
  const response = await fetch('http://localhost:3333/pools/count')
  const data = await response.json()

  return { props: { count: data.count } }
}
