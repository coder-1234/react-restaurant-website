import React from 'react';
import { Breadcrumb, BreadcrumbItem, Card, CardBody, CardHeader, Media} from 'reactstrap';
import { Link } from 'react-router-dom';
import { Stagger, Fade } from 'react-animation-components';
import { baseUrl } from '../shared/baseUrl';
import { Loading } from './LoadingComponent';

function RenderLeader({leader}) {
        return (
            <Fade in>
                <Media className="mb-5">
                    <Media left top className="mr-5">
                        <Media object src={baseUrl+leader.image} />
                    </Media>
                    <Media body>
                        <Media heading>{leader.name}</Media>
                        <h6>{leader.designation}</h6><br/>
                        <p>{leader.description}</p>
                    </Media>
                </Media>
            </Fade>
        );
}


function RenderLeaders({leaders,isLoading,errMess}) {
    const lead = leaders.leaders.map((leader)=>{
        return (<RenderLeader leader={leader} />);
    });

    if (isLoading) {
            return(
                <div className="container">
                    <div className="row">            
                        <Loading />
                    </div>
                </div>
            );
        }
        else if (errMess) {
            return(
                <div className="container">
                    <div className="row">            
                        <h4>{errMess}</h4>
                    </div>
                </div>
            );
        }
    else  return (
        <div className="col-12">
            <Stagger in>
                <Media list>
                    {lead}
                </Media>
            </Stagger>
        </div>);
}


function About(props) {
    return(
        <div className="container">
            <div className="row">
                <Breadcrumb>
                    <BreadcrumbItem><Link to="/home">Home</Link></BreadcrumbItem>
                    <BreadcrumbItem active>About Us</BreadcrumbItem>
                </Breadcrumb>
                <div className="col-12">
                    <h3>About Us</h3>
                    <hr />
                </div>                
            </div>
            <div className="row row-content">
                <div className="col-12 col-md-6">
                    <h2>Our History</h2>
                    <p>Started in 2010, Ristorante con Fusion quickly established itself as a culinary icon par excellence in Hong Kong. With its unique brand of world fusion cuisine that can be found nowhere else, it enjoys patronage from the A-list clientele in Hong Kong.  Featuring four of the best three-star Michelin chefs in the world, you never know what will arrive on your plate the next time you visit us.</p>
                    <p>The restaurant traces its humble beginnings to <em>The Frying Pan</em>, a successful chain started by our CEO, Mr. Peter Pan, that featured for the first time the world's best cuisines in a pan.</p>
                </div>
                <div className="col-12 col-md-5">
                    <Card>
                        <CardHeader className="bg-primary text-white">Facts At a Glance</CardHeader>
                        <CardBody>
                            <dl className="row p-1">
                                <dt className="col-6">Started</dt>
                                <dd className="col-6">3 Feb. 2013</dd>
                                <dt className="col-6">Major Stake Holder</dt>
                                <dd className="col-6">HK Fine Foods Inc.</dd>
                                <dt className="col-6">Last Year's Turnover</dt>
                                <dd className="col-6">$1,250,375</dd>
                                <dt className="col-6">Employees</dt>
                                <dd className="col-6">40</dd>
                            </dl>
                        </CardBody>
                    </Card>
                </div>
                <div className="col-12">
                    <Card>
                        <CardBody className="bg-faded">
                            <blockquote className="blockquote">
                                <p className="mb-0">You better cut the pizza in four pieces because
                                    I'm not hungry enough to eat six.</p>
                                <footer className="blockquote-footer">Yogi Berra,
                                <cite title="Source Title">The Wit and Wisdom of Yogi Berra,
                                    P. Pepe, Diversion Books, 2014</cite>
                                </footer>
                            </blockquote>
                        </CardBody>
                    </Card>
                </div>
            </div>
            <div className="row row-content">
                <div className="col-12 my-2">
                    <h2>Corporate Leadership</h2>
                </div> 
                <RenderLeaders leaders={props.leaders} isLoading={props.isLoading} errMess={props.errMess}/>
            </div>
        </div>
    );
}

export default About;    