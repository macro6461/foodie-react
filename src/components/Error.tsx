interface ErrorProps {
    error: string ;
}
  
  const Error: React.FC<ErrorProps> = ({
    error,
  }) => {
  return <h3 style={{ color: "red" }}>{error}</h3>;
};

export default Error;
