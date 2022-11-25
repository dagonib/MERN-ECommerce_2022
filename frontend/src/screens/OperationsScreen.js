import axios from 'axios';
import { useEffect, useReducer } from 'react';
import Table from 'react-bootstrap/Table';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';

// Establecer como mayúscula la primera letra de una palabra.
function capitalize(word) {
  return word[0].toUpperCase() + word.slice(1);
}

// Establecer número con dos decimales
function financial(number, decimals = 2) {
  return Number.parseFloat(number).toFixed(decimals);
}

const reducer = (state, action) => {
  switch (action.type) {
    // Caso: petición
    case 'FETCH_REQUEST':
      // Devuelve el estado previo, inicial.
      return { ...state, loading: true };
    // Caso: petición realizada correctamente.
    case 'FETCH_SUCCESS':
      // Se obtiene la base de datos.
      return { ...state, operations: action.payload, loading: false };
    // Caso: petición fallida.
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

function OperationsScreen() {
  // Definición del Reducer.
  const [{ loading, error, operations }, dispatch] = useReducer(reducer, {
    operations: [],
    loading: true,
    error: '',
  });

  // Obtener los datos cada vez que se cargue la página.
  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: 'FETCH_REQUEST' });
      try {
        const result = await axios.get('/api/operations');
        dispatch({ type: 'FETCH_SUCCESS', payload: result.data });
      } catch (err) {
        dispatch({ type: 'FETCH_FAIL', payload: err.message });
      }
    };
    fetchData();
  }, []);

  return (
    <div className="operations">
      {loading ? (
        <LoadingBox />
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <Table striped bordered hover size="sm">
          <thead>
            <tr>
              <th>#</th>
              <th>Date</th>
              <th>Type</th>
              <th>Coin</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Cost(USD)</th>
              <th>EUR price</th>
              <th>Cost(EUR)</th>
              <th>Comision(BNB)</th>
              <th>BNB Price</th>
              <th>Comision(EUR)</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            {operations.map((operation) => (
              <tr key={operation.id}>
                <th>{operation.id}</th>
                <th>{operation.date}</th>
                <th>{capitalize(operation.type)}</th>
                <th>{operation.coin}</th>
                <th>{operation.price}</th>
                <th>{operation.quantity}</th>
                <th>{financial(operation.price * operation.quantity)}$</th>
                <th>{financial(operation.eur_dolar, 3)}</th>
                <th>
                  {financial(
                    (operation.price * operation.quantity) / operation.eur_dolar
                  )}
                  €
                </th>
                <th>{operation.comision_BNB}</th>
                <th>{financial(operation.EUR_BNB)}</th>
                <th>{financial(operation.comision_BNB * operation.EUR_BNB)}</th>
                <th>
                  {financial(
                    Number(
                      (operation.price * operation.quantity) /
                        operation.eur_dolar,
                      2
                    ) + Number(operation.comision_BNB * operation.EUR_BNB)
                  )}
                </th>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </div>
  );
}

export default OperationsScreen;
