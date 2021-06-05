import React from "react";
import { Button, Grid, makeStyles } from "@material-ui/core";
import Controls from "../../components/Controls"
import * as selections from '../../components/Selections'

const useStyles = makeStyles(theme => ({
  buttons: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  button: {
    marginTop: theme.spacing(5),
    marginLeft: theme.spacing(1),
  },
}))

export const PartA = ({ values, handleInputChange, errors, setErrors, setActiveStep }) => {

  const validate = () => {
    let temp = {}
    temp.type = values.type ? "" : "This field is required"
    temp.title = values.title ? "" : "This field is required"
    temp.category = values.category ? "" : "This field is required"
    temp.start = values.start ? "" : "This field is required"
    temp.end = values.end ? "" : "This field is required"
    setErrors({
      ...temp
    })

    return Object.values(temp).every(x => x === "");
  }

  const classes = useStyles()
  const { title, type, category, start, end } = values

  const handleNext = () => {
    if (values.start > values.end) {
      alert('invalid date range')
      return
    } else if (!validate()) {
      return
    }
    setActiveStep(step => step + 1)
  }

  return(
      <>
          <Grid container spacing={3}>
              <Grid item xs={12}>
                  <Controls.Input 
                      name="title"
                      label="Title"
                      value={title}
                      //variant="outlined"
                      placeholder="Name of competition/project"
                      onChange={handleInputChange}
                      rows={1}
                      error={errors.title}
                  />
              </Grid>
              <Grid item xs={12} sm={6}>
                    <Controls.Select 
                        name="type"
                        label="Type"
                        value={type}
                        placeholder="Please Specify"
                        onChange={handleInputChange}
                        options={selections.type()}
                        error={errors.type}
                    />
              </Grid>
              <Grid item xs={12} sm={6}>
                    <Controls.Select 
                        name="category"
                        label="Category"
                        value={category}
                        placeholder="Please Specify"
                        onChange={handleInputChange}
                        options={selections.category()}
                        error={errors.category}
                    />
              </Grid>
              <Grid item xs={12} sm={6}>
                  <Controls.Date 
                      name="start"
                      label="Start Date"
                      value={start}
                      onChange={handleInputChange}
                      error={errors.start}
                  />
              </Grid>
              <Grid item xs={12} sm={6}>
                  <Controls.Date 
                      name="end"
                      label="End Date"
                      value={end}
                      onChange={handleInputChange}
                      error={errors.end}
                  />
              </Grid>
          </Grid>
          <div className={classes.buttons}>
              <Button 
                  className={classes.button}
                  variant="contained"
                  color="primary" 
                  onClick={handleNext}
                  >
                  Next
              </Button>
          </div>
      </>     
  )
}