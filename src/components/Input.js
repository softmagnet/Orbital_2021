import {TextField, makeStyles} from "@material-ui/core";
import React from 'react';

const useStyles = makeStyles((theme) => ({
  text: {
    background: "white",
    borderRadius: "4px",
  }
}))

export default function Input(props) {

  const classes = useStyles();
  const {inputProps, name, label, value, variant, placeholder, onChange, rows, error=null} = props;

  return (
    <TextField
      className={classes.text}
      variant={variant}
      label={label}
      name={name}
      value={value}
      placeholder={placeholder}
      onChange={onChange}
      rows={rows}
      {...(error && {error:true, helperText:error})}
      fullWidth
      multiline
      inputProps={inputProps}
    />
  )
}
