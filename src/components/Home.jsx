import React from 'react';
import {
    FormControl,
    Grid,
    InputLabel,
    List,
    ListItem,
    makeStyles,
    MenuItem,
    Select,
    Typography
} from "@material-ui/core";
import logoPoli from "../img/LogoFPUNA.jpeg"

const useStyles = makeStyles({
    root: {
        padding: 16
    },
    logo: {
       width: "50%",
       marginLeft: "auto",
       marginRight: "auto",
       display: "block",
       marginTop: 16,
   },
    tarjeta: {
        padding: 8
    }
});

const Home = () => {
    const classes = useStyles();
    const [algoritmo, setAlgoritmo] = React.useState(0)

    return (
        <div className={classes.root}>
            <Grid container spacing={8}>
                <Grid item xs={12}>
                        <img src={logoPoli} alt="Logo de FPUNA" className={classes.logo}/>
                        <Typography variant="h5">
                            Tarea 1 - Inteligencia Artificial
                        </Typography>
                        <br/>
                        <Typography variant="h6">
                            Integrantes
                        </Typography>
                        <List>
                            <ListItem>
                                Mateo Fidabel
                            </ListItem>
                            <ListItem>
                                Santiago Acevedo
                            </ListItem>
                            <ListItem>
                                Angel Ferreira
                            </ListItem>
                            <ListItem>
                                Isaac Amarilla
                            </ListItem>
                        </List>
                </Grid>
                <Grid item xs={6}>
                    <FormControl>
                        <InputLabel>Algoritmo</InputLabel>
                        <Select value={algoritmo} onChange={event => setAlgoritmo(event.target.value)}>
                            <MenuItem value={0}>Backtracking</MenuItem>
                            <MenuItem value={1}>Las vegas</MenuItem>
                            <MenuItem value={2}>Greedy + 2-opt local</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
            </Grid>
        </div>
    )
}


export default Home;