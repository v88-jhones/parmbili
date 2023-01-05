import Parmbili from "./views/parmbili/parmbili";
import SelectPlantModal from "./views/parmbili/modals/select_plant_modal";
import RemovePlantModal from "./views/parmbili/modals/remove_plant_modal";

function App() {
    return (
        <>
            <nav>Parmbili</nav>
            <Parmbili />
            <SelectPlantModal />
            <RemovePlantModal />
        </>
    );
}

export default App;
