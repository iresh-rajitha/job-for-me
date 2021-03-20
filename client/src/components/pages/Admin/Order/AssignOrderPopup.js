import React from 'react'

export default function AssignOrderPopup(props) {
    const { onClose,selectedValue, open} = props;
    return (
        <div>
            {/* <Dialog onClose={handleClose} aria-labelledby="form-dialog-title" open={open}>
                <DialogTitle id="form-dialog-title">Add Order</DialogTitle>
                <DialogContent>
                <Grid className={styles.marging_b_15px}>
                    <TextField
                    className={styles.textArea}
                    id="outlined-multiline-static"
                    value={formData.fieldName}
                    name="fieldName"
                    label="Field Name"
                    onChange={(e) => onChange(e)}
                    variant="outlined"
                    />
                </Grid>
                <Grid className={styles.marging_b_15px}>
                    <TextField
                    className={styles.textArea}
                    id="outlined-multiline-static"
                    value={formData.description}
                    name="description"
                    label="Description"
                    onChange={(e) => onChange(e)}
                    multiline
                    rows={3}
                    variant="outlined"
                    /> 
                </Grid>
                <DialogActions>
                <Button onClick={handleClose} variant="contained">
                    Cancel
                </Button>
                <Button onClick={submit} variant="contained" color="primary">
                    Submit
                </Button>
                </DialogActions>
                </DialogContent>
            </Dialog> */}
        </div>
    )
}
