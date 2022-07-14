const Button = (props) => {
    return (
      <button
      onClick={props.onClick}
      onChange={props.onChange}
      name={props.name}
        style={{
          backgroundImage : props.backgoundImage,
          backgroundColor: props.backgroundColor? props.backgroundColor : 'rgb(230,230,230)',
          color: props.color,
          border: props.border? props.borer : 'none',
          borderRadius: "7px",
          cursor: props.cursor ? props.cursor : 'pointer',
          fontSize: props.fontSize,
          width: props.width,
          height: props.height? props.height : '20px',
          margin : props.margin,
          display : props.display,
          textDecoration : props.textDecoration? props.textDecoration:'none',
        }}
      >
        {props.value}
      </button>
    );
  };
  
  export default Button;
  