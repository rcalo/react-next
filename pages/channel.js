import Link from 'next/link';
import 'isomorphic-fetch';
import Layout from '../src/components/Layout';
import ChannelsGrid from '../src/components/ChannelGrid';
import PodcastList from '../src/components/PodcastList';
import Error from './_error';
import PodcastPlayer from '../src/components/PodcastPlayer'

export default class Channel extends React.Component{
  
  //Inicizalizo el estado
  constructor(props){
    super(props)
    this.state = {
      openPodcast: null
    }
  }

  static async getInitialProps({query, res}){
      
      let idChannel = query.id

      try{
        //Obtengo todos los datos de las apis en paralelo
        let [reqChannel, reqAudios, reqSeries] = await Promise.all([
            fetch(`https://api.audioboom.com/channels/${idChannel}`),
            fetch(`https://api.audioboom.com/channels/${idChannel}/audio_clips`),
            fetch(`https://api.audioboom.com/channels/${idChannel}/child_channels`)
        ])

        if( reqChannel.status >= 400){
            res.statusCode = reqChannel.status
            return { channel: null, audios: null , series: null, statusCode: reqChannel.status }
        }

        let [dataChannel, dataAudios, dataSeries] = await Promise.all([
            reqChannel.json(),
            reqAudios.json(),
            reqSeries.json()
        ])

        let channel = dataChannel.body.channel
        
        let audios = dataAudios.body.audio_clips

        let series = dataSeries.body.channels
        
        return { channel, audios, series, statusCode: 200 }

      }catch(error){
        return { channel: null, audios: null , series: null, statusCode: 503 }
      }
  }

  openPodcast = (event, podcast) => {
    event.preventDefault()
    this.setState({
      openPodcast: podcast
    })
  }

  closePodcast = (event) => {
    event.preventDefault()
    this.setState({
      openPodcast: null
    })
  }

  render(){

      //Variables
      const {channel, audios, series, statusCode} = this.props
      
      if (statusCode !== 200) {
        return <Error statusCode= { statusCode }></Error>
      }

      const url = channel.urls.banner_image.original
      const {openPodcast} = this.state

      return (
        <Layout title={`channel.title`} url={url}>

          <div>

            { openPodcast &&
              <div className="podcastModal">
                <PodcastPlayer
                  onClose={this.closePodcast}
                  audio={openPodcast}
                ></PodcastPlayer>
              </div>
            }
            <h1>{ channel.title }</h1>

            <div className="col-sm-8">
              { series.length > 0 &&
                <ChannelsGrid channels={series} title={`Series`}> </ChannelsGrid>
              }
            </div>
            
            <div className="col-sm-4">
              { audios.length > 0 &&
                <PodcastList
                  audios={audios} 
                  title={`Ultimos Podcasts`}
                  onClickPodcast={this.openPodcast} 
                > 
                </PodcastList>
              }
            </div>
            
            <style jsx>{`

              h1{
                text-align: center;
              }

              .podcastModal {
                position: fixed;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                z-index: 99999;
              }
            `}</style>
          </div>
        </Layout>
      )
  }
}