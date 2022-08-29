export function InputAutoWidth({
  value = '',
  ...restProps
}: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div
      style={{
        display: 'inline',
        position: 'relative',
        margin: '0 4px',
        borderBottom: '1px solid #ff870f',
      }}
    >
      <span style={{ display: 'inline-block', visibility: 'hidden', minWidth: '60px' }}>
        {value || '测试'}
      </span>
      <input
        {...restProps}
        value={value}
        style={{
          position: 'absolute',
          left: 0,
          top: -1,
          width: '100%',
          height: '100%',
          padding: '0 0',
          border: 0,
          outline: 0,
          font: 'inherit',
          fontSize: 'inherit',
          color: 'currentcolor',
          lineHeight: 'inherit',
          zIndex: 1,
        }}
      />
    </div>
  );
}
