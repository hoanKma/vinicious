import { Flex } from "@chakra-ui/react";
import "./App.css";
import FancyForm from "./module/fancy-form";

function App() {
  return (
    <Flex justify={"center"} marginTop={"10%"}>
      <FancyForm />
    </Flex>
  );
}

export default App;
