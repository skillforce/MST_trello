import useStore from "./hooks/useStore";
import {observer} from "mobx-react-lite";
import Dashboard from "./components/Dashboard";
import Header from "./components/Header";


function App() {
  const {boards} = useStore()


  return (
    <>
      <Header/>
      <main>
      <Dashboard/>
      </main>
    </>
  );
}

export default observer(App);
