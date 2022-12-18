// Import files
import Header from './Components/Header';
import Form from './Components/Form';
import Todolist from './Components/TodoList';

function App() {
    return (
        <div className="App">
            <div className="container">
                <div className="flex flex-col items-center rounded-xl bg-white md:min-w-[400px]  min-h-[600px] p-6">
                    <Header />
                    <Form />
                </div>
            </div>
        </div>
    );
}

export default App;
