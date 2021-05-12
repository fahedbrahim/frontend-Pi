import React, { Component ,useState} from 'react'
import "../../styles/style.css";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";


const delivery = props => (
    <tr>
        <td>{props.delivery.fromDate}</td>
        <td>{props.delivery.toDate}</td>
        <td>{props.delivery.governorate}</td>
        <td>{props.delivery.ville}</td>
        <td>{props.delivery.vehicle}</td>
        <td>{props.delivery.state}</td>
        <td>{props.delivery.constraint}</td>
        <td>{props.delivery.packageSize}</td>
      

    </tr>


)


export class ListFreeDelivery extends React.Component {


    constructor(props) {
        super(props);
        this.state = {
         deliveries: Array().fill(null),
          user: "",
          fromDate: "",
          toDate: "",
          governorate: "",
          ville: "",
          vehicle: "",
          state: "",
          constraint: "",
          packageSize: "",
        }
    
    }

    handleChange = event => {
        this.setState({ [event.target.name]: event.target.value });
    };

    componentDidMount() {
        axios.get('/freeDelivery')
            .then(response => {
                this.setState({ deliveries: response.data })
                console.log(response.data)
            })
            .catch((error) => {
                console.log(error);
            })

      


    }
    render() {

        const objs = this.state.deliveries;

        return (



            <section class="news section">
            <div class="container">
                <div class="row mt-30">
                    <div class="col-lg-4 col-md-6 col-sm-8 col-10 m-auto">
                        <div class="blog-post">
                            <div class="post-thumb">
                                <a href="news-single.html">
                                    <img src="image/delivery.jpg" alt="post-image" class="img-fluid"/>
                                </a>
                            </div>
                            <div class="post-content">
                                <div class="date">
                                    <h4>20<span>May</span></h4>
                                </div>
                                <div class="post-title">
                                    <h2><a href="news-single.html">Elementum purus id ultrices.</a></h2>
                                </div>
                                <div class="post-meta">
                                    <ul class="list-inline">
                                        <li class="list-inline-item">
                                            <i class="fa fa-user-o"></i>
                                            <a href="#">Admin</a>
                                        </li>
                                        <li class="list-inline-item">
                                            <i class="fa fa-heart-o"></i>
                                            <a href="#">350</a>
                                        </li>
                                        <li class="list-inline-item">
                                            <i class="fa fa-comments-o"></i>
                                            <a href="#">30</a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-4 col-md-6 col-sm-8 col-10 m-auto">
                        <div class="blog-post">
                            <div class="post-thumb">
                                <a href="news-single.html">
                                    <img src="images/news/post-thumb-two.jpg" alt="post-image" class="img-fluid"/>
                                </a>
                            </div>
                            <div class="post-content">
                                <div class="date">
                                    <h4>20<span>May</span></h4>
                                </div>
                                <div class="post-title">
                                    <h2><a href="news-single.html">Elementum purus id ultrices.</a></h2>
                                </div>
                                <div class="post-meta">
                                    <ul class="list-inline">
                                        <li class="list-inline-item">
                                            <i class="fa fa-user-o"></i>
                                            <a href="#">Admin</a>
                                        </li>
                                        <li class="list-inline-item">
                                            <i class="fa fa-heart-o"></i>
                                            <a href="#">350</a>
                                        </li>
                                        <li class="list-inline-item">
                                            <i class="fa fa-comments-o"></i>
                                            <a href="#">30</a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-4 col-md-6 m-md-auto col-sm-8 col-10 m-auto">
                        <div class="blog-post">
                            <div class="post-thumb">
                                <a href="news-single.html">
                                    <img src="images/news/post-thumb-three.jpg" alt="post-image" class="img-fluid"/>
                                </a>
                            </div>
                            <div class="post-content">
                                <div class="date">
                                    <h4>20<span>May</span></h4>
                                </div>
                                <div class="post-title">
                                    <h2><a href="news-single.html">Elementum purus id ultrices.</a></h2>
                                </div>
                                <div class="post-meta">
                                    <ul class="list-inline">
                                        <li class="list-inline-item">
                                            <i class="fa fa-user-o"></i>
                                            <a href="#">Admin</a>
                                        </li>
                                        <li class="list-inline-item">
                                            <i class="fa fa-heart-o"></i>
                                            <a href="#">350</a>
                                        </li>
                                        <li class="list-inline-item">
                                            <i class="fa fa-comments-o"></i>
                                            <a href="#">30</a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-4 col-md-6 col-sm-8 col-10 m-auto">
                        <div class="blog-post">
                            <div class="post-thumb">
                                <a href="news-single.html">
                                    <img src="images/news/post-thumb-four.jpg" alt="post-image" class="img-fluid"/>
                                </a>
                            </div>
                            <div class="post-content">
                                <div class="date">
                                    <h4>20<span>May</span></h4>
                                </div>
                                <div class="post-title">
                                    <h2><a href="news-single.html">Elementum purus id ultrices.</a></h2>
                                </div>
                                <div class="post-meta">
                                    <ul class="list-inline">
                                        <li class="list-inline-item">
                                            <i class="fa fa-user-o"></i>
                                            <a href="#">Admin</a>
                                        </li>
                                        <li class="list-inline-item">
                                            <i class="fa fa-heart-o"></i>
                                            <a href="#">350</a>
                                        </li>
                                        <li class="list-inline-item">
                                            <i class="fa fa-comments-o"></i>
                                            <a href="#">30</a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-4 col-md-6 col-sm-8 col-10 m-auto">
                        <div class="blog-post">
                            <div class="post-thumb">
                                <a href="news-single.html">
                                    <img src="images/news/post-thumb-five.jpg" alt="post-image" class="img-fluid"/>
                                </a>
                            </div>
                            <div class="post-content">
                                <div class="date">
                                    <h4>20<span>May</span></h4>
                                </div>
                                <div class="post-title">
                                    <h2><a href="news-single.html">Elementum purus id ultrices.</a></h2>
                                </div>
                                <div class="post-meta">
                                    <ul class="list-inline">
                                        <li class="list-inline-item">
                                            <i class="fa fa-user-o"></i>
                                            <a href="#">Admin</a>
                                        </li>
                                        <li class="list-inline-item">
                                            <i class="fa fa-heart-o"></i>
                                            <a href="#">350</a>
                                        </li>
                                        <li class="list-inline-item">
                                            <i class="fa fa-comments-o"></i>
                                            <a href="#">30</a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-4 col-md-6 m-md-auto col-sm-8 col-10 m-auto">
                        <div class="blog-post">
                            <div class="post-thumb">
                                <a href="news-single.html">
                                    <img src="images/news/post-thumb-six.jpg" alt="post-image" class="img-fluid"/>
                                </a>
                            </div>
                            <div class="post-content">
                                <div class="date">
                                    <h4>20<span>May</span></h4>
                                </div>
                                <div class="post-title">
                                    <h2><a href="news-single.html">Elementum purus id ultrices.</a></h2>
                                </div>
                                <div class="post-meta">
                                    <ul class="list-inline">
                                        <li class="list-inline-item">
                                            <i class="fa fa-user-o"></i>
                                            <a href="#">Admin</a>
                                        </li>
                                        <li class="list-inline-item">
                                            <i class="fa fa-heart-o"></i>
                                            <a href="#">350</a>
                                        </li>
                                        <li class="list-inline-item">
                                            <i class="fa fa-comments-o"></i>
                                            <a href="#">30</a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-4 col-md-6 col-sm-8 col-10 m-auto">
                        <div class="blog-post">
                            <div class="post-thumb">
                                <a href="news-single.html">
                                    <img src="images/news/post-thumb-seven.jpg" alt="post-image" class="img-fluid"/>
                                </a>
                            </div>
                            <div class="post-content">
                                <div class="date">
                                    <h4>20<span>May</span></h4>
                                </div>
                                <div class="post-title">
                                    <h2><a href="news-single.html">Elementum purus id ultrices.</a></h2>
                                </div>
                                <div class="post-meta">
                                    <ul class="list-inline">
                                        <li class="list-inline-item">
                                            <i class="fa fa-user-o"></i>
                                            <a href="#">Admin</a>
                                        </li>
                                        <li class="list-inline-item">
                                            <i class="fa fa-heart-o"></i>
                                            <a href="#">350</a>
                                        </li>
                                        <li class="list-inline-item">
                                            <i class="fa fa-comments-o"></i>
                                            <a href="#">30</a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-4 col-md-6 col-sm-8 col-10 m-auto">
                        <div class="blog-post">
                            <div class="post-thumb">
                                <a href="news-single.html">
                                    <img src="images/news/post-thumb-eight.jpg" alt="post-image" class="img-fluid"/>
                                </a>
                            </div>
                            <div class="post-content">
                                <div class="date">
                                    <h4>20<span>May</span></h4>
                                </div>
                                <div class="post-title">
                                    <h2><a href="news-single.html">Elementum purus id ultrices.</a></h2>
                                </div>
                                <div class="post-meta">
                                    <ul class="list-inline">
                                        <li class="list-inline-item">
                                            <i class="fa fa-user-o"></i>
                                            <a href="#">Admin</a>
                                        </li>
                                        <li class="list-inline-item">
                                            <i class="fa fa-heart-o"></i>
                                            <a href="#">350</a>
                                        </li>
                                        <li class="list-inline-item">
                                            <i class="fa fa-comments-o"></i>
                                            <a href="#">30</a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-4 col-md-6 m-md-auto col-sm-8 col-10 m-auto">
                        <div class="blog-post">
                            <div class="post-thumb">
                                <a href="news-single.html">
                                    <img src="images/news/post-thumb-nine.jpg" alt="post-image" class="img-fluid"/>
                                </a>
                            </div>
                            <div class="post-content">
                                <div class="date">
                                    <h4>20<span>May</span></h4>
                                </div>
                                <div class="post-title">
                                    <h2><a href="news-single.html">Elementum purus id ultrices.</a></h2>
                                </div>
                                <div class="post-meta">
                                    <ul class="list-inline">
                                        <li class="list-inline-item">
                                            <i class="fa fa-user-o"></i>
                                            <a href="#">Admin</a>
                                        </li>
                                        <li class="list-inline-item">
                                            <i class="fa fa-heart-o"></i>
                                            <a href="#">350</a>
                                        </li>
                                        <li class="list-inline-item">
                                            <i class="fa fa-comments-o"></i>
                                            <a href="#">30</a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-12 text-center">
                        <nav class="d-flex justify-content-center">
                          <ul class="pagination">
                              <li class="page-item">
                              <a class="page-link" href="#" aria-label="prev">
                                <span aria-hidden="true"><i class="fa fa-angle-left"></i></span>
                                <span class="sr-only">prev</span>
                              </a>
                            </li>
                            <li class="page-item active"><a class="page-link" href="#">1</a></li>
                            <li class="page-item"><a class="page-link" href="#">2</a></li>
                            <li class="page-item"><a class="page-link" href="#">3</a></li>
                            <li class="page-item">
                              <a class="page-link" href="#" aria-label="Next">
                                <span aria-hidden="true"><i class="fa fa-angle-right"></i></span>
                                <span class="sr-only">Next</span>
                              </a>
                            </li>
                          </ul>
                        </nav>
                    </div>
                </div>
            </div>
        </section>

);
}
}

export default ListFreeDelivery 