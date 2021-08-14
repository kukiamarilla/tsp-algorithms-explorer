import React, {useState} from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import logoPoli from "./img/LogoFPUNA.jpeg"
import {Col, Container, Form, Image, Row} from "react-bootstrap";

function App() {
    const [algoritmo, setAlgoritmo] = useState(0)
    const [tamanho, setTamanho] = useState(1)
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
                                          onChange={event => {setTamanho(event.target.value)}}/>
                        </Form.Group>
                    </Form>
                </Col>
            </Row>
            <Row>

            </Row>
        </Container>
      </>
  );
}

export default App;
