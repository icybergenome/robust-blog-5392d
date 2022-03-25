import '../sass/main.scss';
import { useMemo } from 'react' 
import { client } from '../utils/apollo/apollo';
import { ApolloProvider } from '@apollo/client';
import { GET_POSTS } from '../utils/graphql/mutation/post';
import { ChakraProvider,ColorModeScript,ColorModeProvider,CSSReset } from '@chakra-ui/react'; 
// import { MarkdownFieldPlugin } from "react-tinacms-editor";
import { withTina } from "tinacms";
import { HtmlFieldPlugin, MarkdownFieldPlugin } from "react-tinacms-editor"
import { useState,useEffect,useContext } from 'react';
import { AuthProvider } from '../utils/context/auth-context';
import ProtectedRoute from '../components/ProtectedRoute';
import { AuthContext } from '../utils/context/auth-context';
import { useRouter } from 'next/router';
import Login from '../components/Login';


 function MyApp({ Component, pageProps }) {

    const router = useRouter()
    return (
        <ApolloProvider client={client}>
            <AuthProvider>
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
            
            </AuthProvider>
        </ApolloProvider>
    )
}
// (pageSlug == 'login' || pageSlug == 'register') && !token ? <Login /> : 
export default withTina(MyApp, {
    plugins: [MarkdownFieldPlugin],
    enabled: true,
    sidebar: true,
  })
