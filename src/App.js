import React, {useState} from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import logoPoli from "./img/LogoFPUNA.jpeg"
import {Button, Col, Container, Form, Image, Row, Table} from "react-bootstrap";
import {clonarMatriz, crearMatriz} from "./funciones";

function App() {
    const [algoritmo, setAlgoritmo] = useState(0)
    const [tamanho, setTamanho] = useState(1)
    const [matriz, setMatriz] = useState(crearMatriz(1))

    const setearTamanho = (event) => {
        const n = parseInt(event.target.value);
        setTamanho(n);
        const nuevaMatriz = crearMatriz(n);
        setMatriz(nuevaMatriz);
    }

    const setearCosto = (fila, columna) => (event) => {
        const nuevoCosto = parseInt(event.target.value)

        if (!isNaN(nuevoCosto)) {
            setMatriz( previous => {
                const copia = clonarMatriz(previous);
                copia[fila][columna] = nuevoCosto;
                return copia;
            });
        }
    }

    const ejecutarAlgoritmo = () => {
        // DO SOMETHING
    }

    return (
      <>
        <Container fluid className="m-0">
            <Row>
                <Col sm={6}>
                    <Image src={logoPoli} alt="FPUNA" className="logo"/>
                    <h1>Traveling Salesman Problem</h1>
                    <h2>Integrantes</h2>
                    <li>Mateo Fidabel</li>
                    <li>Santiago Acevedo</li>
                    <li>Angel Ferreira</li>
                    <li>Isaac Amarilla</li>
                </Col>
                <Col sm={6}>
                    <Form className="mt-5">
                        <Form.Group>
                            <Form.Label>Algoritmo</Form.Label>
                            <Form.Select value={algoritmo}
                                         onChange={event => {setAlgoritmo(event.target.value)}}>
                                <option value={0}>Seleccione el algoritmo</option>
                                <option value={1}>Backtracking</option>
                                <option value={2}>Algoritmo de las vegas</option>
                                <option value={3}>Avaro + 2-opt local</option>
                            </Form.Select>
                        </Form.Group>
                        <br/>
                        <Form.Group>
                            <Form.Label>Valor de N</Form.Label>
                            <Form.Control type="number"
                                          value={tamanho}
                                          onChange={setearTamanho}/>
                        </Form.Group>
                        <br/>
                        <Form.Group>
                            <Button variant="primary"
                                    onClick={ejecutarAlgoritmo}>Calcular</Button>
                        </Form.Group>
                    </Form>
                </Col>
            </Row>
            <Row style={{margin: 8}}>
                <h3>Costos</h3>
                <Table striped bordered hover>
                    <tbody>
                    {
                        matriz.map( (fila, indexFila = 1) => {
                            return (
                                <tr key={indexFila}>
                                    {
                                        fila.map( (columna, indexColumna = 1) => {
                                            return (
                                                <td key={indexFila + " " + indexColumna}>
                                                    <Form.Control type="number"
                                                                  value={matriz[indexFila][indexColumna]}
                                                                  onChange={setearCosto(indexFila, indexColumna)}
                                                                  disabled={indexFila == indexColumna}
                                                    />
                                                </td>
                                            )
                                        })
                                    }
                                </tr>
                            )
                        })
                    }
                    </tbody>
                </Table>
            </Row>
            <Row style={{margin: 8}}>
                {/* Aca por ahi poner el Resultado*/}
            </Row>
        </Container>
      </>
    );
}

export default App;
