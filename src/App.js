import React, {useState} from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import logoPoli from "./img/LogoFPUNA.jpeg"
import {Button, Col, Container, Form, Image, Row, Table} from "react-bootstrap";
import {aleatorizarMatriz, calcularCosto, clonarMatriz, crearMatriz, hallarTranspuesta, rutaString} from "./funciones";
import {TSP} from "./clases";
import Grafico from './Grafico';

function App() {
    const [algoritmo, setAlgoritmo] = useState(0);
    const [tamanho, setTamanho] = useState(4);
    const [matriz, setMatriz] = useState(crearMatriz(4));
    const [ruta, setRuta] = useState([]);
    const [tiempo, setTiempo] = useState(0.0);
    const [costo, setCosto] = useState(0.0);

    const setearTamanho = (event) => {
        const n = parseInt(event.target.value);
        setTamanho(n);

        if (!isNaN(n)) {
            const nuevaMatriz = crearMatriz(n);
            setMatriz(nuevaMatriz);
        }
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
        const transpuesta = hallarTranspuesta(matriz);
        const tsp = new TSP(transpuesta[0], transpuesta[1]);
        let t0 = performance.now();
        switch (algoritmo) {
            case '1':
                // Backtracking
                tsp.backtracking();
                break;
            case '2':
                // Algoritmo de las vegas
				tsp.lasvegas();
                break;
            case '3':
                // Avaro + 2-opt local
                tsp.avaro();
                tsp.optimizar_profundo();
                break;
            default:
                break;
        }
        let t1 = performance.now();
        console.log(`Tiempo ${t1-t0} ms`)
        setRuta(tsp.ruta);
        setCosto(tsp.evaluarRuta(tsp.ruta));
        setTiempo(t1-t0);
    }

    const aleatorizar = () => {
        setMatriz(aleatorizarMatriz(-5, 5));
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
                        <Row>
                            <Col>
                                <Form.Group>
                                    <Button variant="primary"
                                            onClick={ejecutarAlgoritmo}
                                            disabled={algoritmo === 0}>Calcular</Button>
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group>
                                    <Button variant="secondary"
                                            onClick={aleatorizar}>Aleatorio</Button>
                                </Form.Group>
                            </Col>
                        </Row>
                    </Form>
                </Col>
            </Row>
            <Row style={{margin: 16}}>
                <Col sm={6}>
                    <Form>
                        <Form.Group>
                            <Form.Label>Tiempo de Ejecución</Form.Label>
                            <Form.Control value={`${Number(tiempo.toFixed(2))} ms`} readOnly/>
                        </Form.Group>
                        <br/>
                        <Form.Group>
                            <Form.Label>Costo del camino</Form.Label>
                            <Form.Control value={ruta.length === tamanho
                                ? costo
                                : "0"} readOnly/>
                        </Form.Group>
                    </Form>
                </Col>
                <Col>
                    <Form.Group>
                        <Form.Label>Ruta</Form.Label>
                        {ruta.length === tamanho
                            ? <Form.Control as="textarea" value={ruta.reduce(rutaString)} readOnly/>
                            : <Form.Control value="No disponible" readOnly />
                        }
                    </Form.Group>
                </Col>
            </Row>
            <Row style={{margin: 8}}>
                <h3>Coordenadas</h3>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>Ciudad / Coordenada </th>
                            <th>Coordenada X</th>
                            <th>Coordenada Y</th>
                        </tr>
                    </thead>
                    <tbody>
                    {
                        matriz.map( (fila, indexFila = 1) => {
                            return (
                                <tr key={indexFila}>
                                    <td>M{indexFila}</td>
                                    {
                                        fila.map( (columna, indexColumna = 1) => {
                                            return (
                                                <td key={indexFila + " " + indexColumna}>
                                                    <Form.Control type="number"
                                                                  value={matriz[indexFila][indexColumna]}
                                                                  onChange={setearCosto(indexFila, indexColumna)}
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
                <Grafico matriz={matriz} ruta={ruta}/>
            </Row>
        </Container>
      </>
    );
}

export default App;
