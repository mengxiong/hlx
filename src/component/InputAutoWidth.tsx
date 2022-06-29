export function InputAutoWidth(props: React.InputHTMLAttributes<HTMLInputElement>) {
  const { value } = props;
  return (
    <div style={{ display: 'inline', position: 'relative', padding: 4, margin: '0 4px' }}>
      <span style={{ visibility: 'hidden', minWidth: 80, display: 'inline-block' }}>{value}</span>
      <input
        {...props}
        style={{
          position: 'absolute',
          left: 0,
          top: 0,
          width: '100%',
          height: '100%',
          border: 0,
          outline: 0,
          font: 'inherit',
          fontSize: 'inherit',
          color: 'currentcolor',
          lineHeight: 'inherit',
          borderBottom: '1px solid #ff870f',
          zIndex: 2,
        }}
      />
    </div>
  );
}
