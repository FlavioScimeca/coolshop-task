import { useEffect, useState } from 'react';
import './App.css';
import Row from './components/Row';

function App() {
  //* inizializzo rows un Array<Riga> ogni riga è un oggetto avente sign,value,enabled
  const [rows, setRows] = useState([{ sign: '+', value: 0, enabled: true }]);
  const [result, setResult] = useState(0);

  //* passo questa funzione nel map() così da aver accesso all Index, key sarà una delle propietà dell oggetto Riga (sign | value | enabled) e value il nuovo valore.
  const handleChange = (index, key, value) => {
    //* Creo una copia di rows come si fa con Reduxe lavoro sulla riga copiata che poi riassegnerò.
    const updatedRows = [...rows];
    //* Qui accedo alla singola Riga tramite il suo Index e alla sua propieta tramite Key e la aggiorno con il Value in ingresso
    updatedRows[index][key] = value;
    //* Assegno arows l Array di supporto (updatedRows)
    setRows(updatedRows);
  };

  //* La funzione accede a setRows e aggiunge una nuova Riga includendo le precedenti con lo spread operator
  const addRow = () => {
    setRows([...rows, { sign: '+', value: 0, enabled: true }]);
  };

  //* Nel map() ho accesso all indice della singola Riga
  const removeRow = (index) => {
    //* Creo una copia e lavoro su quella
    const updatedRows = [...rows];
    //* rimuovo la Riga usando lo splice() che prende la Riga grazie all Index e rimuove 1 elemento A PARTIRE DA ESSA (se avessi messo 2 mi avrebbe eliminato anche quella successiva)
    updatedRows.splice(index, 1);
    //* Assegno arows l Array di supporto (updatedRows)
    setRows(updatedRows);
  };

  //* Per vedere il result real time utilizzo lo useEffect() che aggiorna il componente al cambiamento di rows (perche è nell Array dependency)
  useEffect(() => {
    //* mi creo un count inizializzato a 0
    let sum = 0;
    //* itero ogni riga
    rows.forEach((row) => {
      //*  Per ogni riga controllo se la propieta row.enabled è true (if esegue il blocco solo se la condizione è true)
      if (row.enabled) {
        const value = parseFloat(row.value);
        //* Faccio un controllo perche quando elimino tutto dal campo input value diventa NAN
        if (!isNaN(value)) {
          //* Incremento il count e con un operatore ternario controllo se + o -
          sum += row.sign === '+' ? value : -value;
        }
      }
    });
    //* Posso farlo fuori dallo scope del forEach(), sum appartiene allo stesso scope
    setResult(sum);
    //* Al cambiamento di rows esegue il codice sopra
  }, [rows]);

  return (
    <div>
      {/* Per ogni riga renderizzo Row (un functional component) e passo come props i dati e funzioni necessarie */}
      {rows.map((row, idx) => (
        <Row
          key={idx}
          index={idx}
          row={row}
          handleChange={handleChange}
          removeRow={removeRow}
        />
      ))}
      <button onClick={addRow}>Add Row</button>

      <div>Result: {result}</div>
    </div>
  );
}

export default App;
