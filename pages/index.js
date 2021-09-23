import { useState, useRef } from "react";
import Head from "next/head";
//import styles from '../styles/Home.module.css';

import cheerio from "cheerio";
import axios from "axios";

import { Input, Button } from "@chakra-ui/react";

export default function Home(props) {
  const inputRef = useRef();
  // const [url, setUrl] = useState("");

  const [urlFile, setUrlFile] = useState("");
  const [extensionName, setExtensionName] = useState("");

  const handleSubmit = async (e) => {
    // async function handleSubmit(e) {
    e.preventDefault();

    const url = inputRef.current.value;

    try {
      const { data } = await axios.post("/api/getHtml", { url });
      // console.log(data.urlFile);
      const urlFile = data.urlFile;
      const extensionName = data.extensionName;
      // setUrl(url);
      setUrlFile(urlFile);
      setExtensionName(extensionName);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div>
      <Head>
        <title>title</title>
      </Head>
      {/* <main> */}
      {/* <form onSubmit={getFirefoxExtensionSubmit}> */}
      <form onSubmit={handleSubmit}>
        <Input ref={inputRef} placeholder="Basic usage" />
        <Button onClick={handleSubmit} colorScheme="blue">
          generar link
        </Button>
      </form>
      {extensionName}
      <Button as="a" href={urlFile} /*target="_blank"*/ colorScheme="blue">
        descargar
      </Button>

      {/* </main> */}
    </div>
  );
}
