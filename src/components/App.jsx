import { Component } from "react";
import { Searchbar } from "./Searchbar/Searchbar";
import { getImages } from "helpers/api";
import { ImageGallery } from "./ImageGallery/ImageGallery";
import { Button } from "./Button/Button";
import { Loader } from "./Loader/Loader";
import { Modal } from "./Modal/Modal";

const EMPTY_MSG = 'Sorry. There are not such images...';
const EMPTY_INPUT_MSG = "Please, type something in input to search.";
const ERROR_MSG="Something went wrong. Try to reload the page!"

export class App extends Component{
  state = {
    query: '',
    images: [],
    page: 1,
    isLoading: false,
    error: null,  
    isShowBtn: false,
    isEmpty: false,
    isQueryEmpty: false,
    isModalShown: false,
    bigImage:'',
  }

  abortCtrl;

  async componentDidUpdate(_, prevState) {
    const { query, page } = this.state;
    if (prevState.query !== query || prevState.page!==page) {
      console.log("Yes")
      try
      {
        if (this.abortCtrl) {
          this.abortCtrl.abort();
        }
        this.abortCtrl = new AbortController();
        this.setState({ isLoading: true, error: null });
        if (!query) {
          this.setState({ isQueryEmpty: true });
          return;
        }
        const response = await getImages(query, page, this.abortCtrl);
        const {
          data: { hits: images, totalHits },
          config: { params: { page: currPage, per_page } } } = response;
        if (!images.length) {
          this.setState({ isEmpty: true });
          return;
        }
        
        this.setState(prevState => ({
          images: [...prevState.images, ...images],
          isShowBtn: currPage < Math.ceil(totalHits / per_page)
        })); 
      }
      catch (error)
      {
        if (error.code !== 'ERR_CANCELED') {
          this.setState({ error: ERROR_MSG });
        }
      }
      finally
      {
        this.setState({isLoading:false})
      }
    }    
  }

  componentWillUnmount() {
    this.abortCtrl.abort();
  }

  onLoadMoreBtnClick = e => {
    this.setState(prevState => ({
      page: prevState.page + 1
    }))
  }
  
  onFormSubmit = (value) => {
    this.setState({
      query: value,
      images: [],
      page: 1,
      error: null,  
      isShowBtn: false,
      isEmpty: false,
      isQueryEmpty: value? false:true,
      isModalShown: false,
      bigImage:'',
    })
  }
  
  onModalOpen = (e) => {
    const altDescr=e.target.alt
    const bigImgURL = e.target.dataset.bigphoto;
    this.setState({isModalShown:true, bigImage:{bigImgURL, altDescr}})
  }
  onModalClose = () => {
    this.setState({isModalShown:false})
  }
  render() {
    const { images,isLoading, isShowBtn, isQueryEmpty, isEmpty, error, isModalShown, bigImage} = this.state;
    return <>
      <Searchbar onSubmit={this.onFormSubmit}/>
      <ImageGallery images={images} onOpen={this.onModalOpen} />
      {isQueryEmpty && <p>{EMPTY_INPUT_MSG}</p>}
      {isEmpty && <p>{EMPTY_MSG}</p>}
      {error && <p>{ERROR_MSG}</p>}
      {isLoading && <Loader/>}
      {isShowBtn && <Button onClick={this.onLoadMoreBtnClick}/>}
      <Modal isOpen={isModalShown} onClose={this.onModalClose} bigImg={bigImage}></Modal>
    </>
  }
}
