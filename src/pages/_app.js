
import '../sass/main.scss';
import { useMemo, useState } from 'react' 
import { client, setToken } from '../utils/apollo/apollo';
import { ApolloProvider } from '@apollo/client';
import { GET_POSTS } from '../utils/graphql/mutation/post';
import { ChakraProvider,ColorModeScript,ColorModeProvider,CSSReset } from '@chakra-ui/react'; 
// import { MarkdownFieldPlugin } from "react-tinacms-editor";
import { withTina,TinaProvider, TinaCMS, useCMS } from "tinacms";
import { HtmlFieldPlugin, MarkdownFieldPlugin } from "react-tinacms-editor"
import { AuthProvider } from '../utils/context/auth-context';
import ProtectedRoute from '../components/ProtectedRoute';
import { useEffect } from 'react';
import ReactGA from "react-ga4";
// import { GitClient, GitMediaStore } from '@tinacms/git-client'

import TinaMediaStore from '../utils/tina/store';


function MyApp({ Component, pageProps }) {

    const cms = useCMS()
    const { slug } = pageProps 
    console.log("SLUG",slug)

    useEffect(()=>{
      
      if((slug === 'newPost' || slug === 'editPost')){
        cms.enable()
       }else{
        document.body.style.paddingLeft = '0'
        cms.disable()
       }
      
        
    }, [slug])


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
                        {/* <TinaProvider cms={cms}> */}
                        { 
                            pageProps.protected ? <ProtectedRoute componentProps={pageProps} element={Component}/> : <Component {...pageProps} />
                        }
                        {/* </TinaProvider> */}
                    </ChakraProvider>
                </ApolloProvider>
            </AuthProvider>
    )
}

// export default MyApp;

export default withTina(MyApp, {
    media: new TinaMediaStore(),
    plugins: [MarkdownFieldPlugin],
    enabled: true,
    sidebar: true
  })