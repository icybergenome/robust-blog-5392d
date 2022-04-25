
import '../sass/main.scss';
import { useMemo, useState } from 'react' 
import { client, setToken } from '../utils/apollo/apollo';
import { ApolloProvider } from '@apollo/client';
import { GET_POSTS } from '../utils/graphql/mutation/post';
import { ChakraProvider,ColorModeScript,ColorModeProvider,CSSReset } from '@chakra-ui/react'; 
// import { MarkdownFieldPlugin } from "react-tinacms-editor";
import { withTina } from "tinacms";
import { HtmlFieldPlugin, MarkdownFieldPlugin } from "react-tinacms-editor"
import { AuthProvider } from '../utils/context/auth-context';
import ProtectedRoute from '../components/ProtectedRoute';
import { useEffect } from 'react';


import ReactGA from "react-ga4";

 function MyApp({ Component, pageProps }) {

    useEffect(() => {
        
        ReactGA.initialize(process.env.NEXT_PUBLIC_G);
        ReactGA.send(window.location.pathname + window.location.search);
         
      }, []);

    return (
        <AuthProvider>
            <ApolloProvider client={client}>
                <ChakraProvider>
                    <ColorModeScript initialColorMode="light" />
                    <ColorModeProvider options={{
                        useSystsemColorMode: true
                    }}>
                        <CSSReset />
                    </ColorModeProvider>
                    { 
                        pageProps.protected ? <ProtectedRoute componentProps={pageProps} element={Component}/> : <Component {...pageProps} />
                    }
                </ChakraProvider>
            </ApolloProvider>
        </AuthProvider>
    )
}
export default withTina(MyApp, {
    plugins: [MarkdownFieldPlugin],
    enabled: true,
    sidebar: true,
  })