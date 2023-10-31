// import { BrowserRouter, Routes, Route } from "react-router-dom";
// import Layout from "./Layout/Layout/Layout";
// import Home from "./Component/Pages/Home/Home";

// import NoPage from "./Accounts/NoPage/NoPage";
// import "./App.css";
// import Table from "./Component/Pages/UseState/API/StateTable/StateTable";
// import StateForm from "./Component/Pages/UseState/API/StateForm/StateForm";
// import ReducerTable from "./Component/Pages/Usereducer/API/ReducerTable/ReducerTable";
// import ReducerForm from "./Component/Pages/Usereducer/API/ReducerForm/ReducerForm";
// import Final from "./Component/Pages/Usecontext/API/Final";
// import UserForm from "./Component/Pages/Usecontext/API/UserForm";
// import UserTable from "./Component/Pages/Usecontext/API/UserTable";
// import { UserProvider } from "./Component/Pages/Usecontext/API/UserContext";

// function App() {
//   return (
//     <div className="App">
//       <BrowserRouter>
//         <Layout /> {/* Include the Layout component outside of routing */}
//         <Routes>
//           <Route path="/">
//             <Route index element={<Home />} />
//             <Route path="usestate-api" element={<Table />} />
//             <Route path="/form" element={<StateForm />} />
//             <Route path="form/:id" element={<StateForm />} />
//             <Route path="usereducer-api" element={<ReducerTable />} />
//             <Route path="/reducerform" element={<ReducerForm />} />
//             <Route path="/reducerform/:id" element={<ReducerForm />} />
//             {/* <Route path="usecontext-api" element={<UserTable />} />
//             <Route path="contextform" element={<UserForm />} />
//             <Route path="contextform/:id" element={<UserForm />} /> */}
//             {/* <Route
//               path="contextform"
//               element={
//                 <UserProvider>
//                   <UserForm />
//                 </UserProvider>
//               }
//             /> */}

//             <Route path="*" element={<NoPage />} />
//           </Route>

//           <Route
//             path="/usecontext-api/*"
//             element={
//               <UserProvider>
//                 <Routes>
//                   <Route index element={<UserTable />} />
//                   <Route path="contextform" element={<UserForm />} />
//                   <Route path="contextform/:id" element={<UserForm />} />
//                 </Routes>
//               </UserProvider>
//             }
//           />
//         </Routes>
//         {/* <UserProvider>
//           <Routes>
//             <Route exact path="usecontext-api" element={<UserTable />} />
//             <Route path="contextform" element={<UserForm />} />
//             <Route path="contextform/:id" element={<UserForm />} />
//           </Routes>
//         </UserProvider> */}
//       </BrowserRouter>
//     </div>
//   );
// }

// export default App;

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./Layout/Layout/Layout";
import Home from "./Component/Pages/Home/Home";

import NoPage from "./Accounts/NoPage/NoPage";
import "./App.css";
import Table from "./Component/Pages/UseState/API/StateTable/StateTable";
import StateForm from "./Component/Pages/UseState/API/StateForm/StateForm";
import ReducerTable from "./Component/Pages/Usereducer/API/ReducerTable/ReducerTable";
import ReducerForm from "./Component/Pages/Usereducer/API/ReducerForm/ReducerForm";

import UserForm from "./Component/Pages/Usecontext/API/UserForm";
import UserTable from "./Component/Pages/Usecontext/API/UserTable";
import { UserProvider } from "./Component/Pages/Usecontext/API/UserContext";
import ContextTable from "./Component/Pages/Usecontext/Normal/ContextTable/ContextTable";
import { GlobalProvider } from "./Hooks/Context/GlobalProvider/ContextStore";
import ContextForm from "./Component/Pages/Usecontext/Normal/ContextForm/ContextForm";
import ReduxTable from "./Component/Pages/Redux/ReduxTable";
import ReduxForm from "./Component/Pages/Redux/ReduxForm";
import Game from "./Game/Game";
import CarGame from "./Game/Racegame/CarRace";
import ReduxList from "./Component/Pages/SagaUI/SagaTable";
import SagaForm from "./Component/Pages/SagaUI/SagaForm";
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Layout />
        <UserProvider>
          <GlobalProvider>
            <Routes>
              <Route>
                {/* <Route path="/" element={<Layout />} /> */}
                <Route path="/" element={<Home />} />
                <Route path="usestate-api" element={<Table />} />
                <Route path="/form" element={<StateForm />} />
                <Route path="form/:id" element={<StateForm />} />
                <Route path="usereducer-api" element={<ReducerTable />} />
                <Route path="/reducerform" element={<ReducerForm />} />
                <Route path="/reducerform/:id" element={<ReducerForm />} />
                <Route path="usecontext-api" element={<UserTable />} />
                <Route path="contextform" element={<UserForm />} />
                <Route path="contextform/:id" element={<UserForm />} />
                <Route path="usecontext-apiR" element={<ContextTable />} />
                <Route path="Usecontextform" element={<ContextForm />} />
                <Route path="Usecontextform/:id" element={<ContextForm />} />
                <Route path="reduxtable" element={<ReduxTable />} />
                <Route path="redux" element={<ReduxForm />} />
                <Route path="redux/:id" element={<ReduxForm />} />
                <Route path="game" element={<Game />} />
                <Route path="cargame" element={<CarGame />} />
                <Route path="sagatable" element={<ReduxList />} />
                <Route path="sagaform" element={<SagaForm />} />
                <Route path="sagaform/:id" element={<SagaForm />} />

                <Route path="*" element={<NoPage />} />
              </Route>
            </Routes>
          </GlobalProvider>
        </UserProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
