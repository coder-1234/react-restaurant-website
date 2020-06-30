import React from 'react';
import {Card,CardTitle,CardBody,CardText,CardImg, Breadcrumb, BreadcrumbItem, Button,
		Modal, ModalHeader, ModalBody, Row, Col, Label} from 'reactstrap';
import {Link} from 'react-router-dom';
import { LocalForm, Control, Errors } from 'react-redux-form';
import { Loading } from './LoadingComponent';
import { baseUrl } from '../shared/baseUrl';
import { FadeTransform, Fade, Stagger } from 'react-animation-components';

const required=(val)=>val && val.length;

const maxLength = (len) => (val) => !(val) || val.length<len;

const minLength = (len) => (val) => (val) && (val.length >= len);

class CommentForm extends React.Component {

	constructor(props){
		super(props);

		this.state={
		isModalOpen: false,
		};
		
		this.handleSubmit=this.handleSubmit.bind(this);
		this.toggleModal=this.toggleModal.bind(this);
	}

	toggleModal(){
		this.setState({
			isModalOpen: !this.state.isModalOpen
		});
	}

	handleSubmit(values){
		this.toggleModal();
		this.props.postComment(this.props.dishId, values.rating, values.author, values.comment);
	}

	render(){
		return (
			<React.Fragment>
				<Button onClick={this.toggleModal} outline color="secondary">
                    <span className="mx-1 fa fa-pencil fa-lg"></span>Submit Comment
                </Button>
                <Modal toggle={this.toggleModal} isOpen={this.state.isModalOpen}>
                	<ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
                	<ModalBody>
                		<LocalForm onSubmit={(values)=>this.handleSubmit(values)}>
                			<Row className="form-group">
                				<Label htmlFor="rating" className="ml-3">Rating</Label>
                				<Col md={12}>
                					<Control.select model=".rating" name="rating" className="form-control">
                						<option>1</option>
                						<option>2</option>
                						<option>3</option>
                						<option>4</option>
                						<option>5</option>
                					</Control.select>  
                				</Col>
                			</Row>
                			<Row className="form-group">
                				<Label htmlFor="author" className="ml-3">Your Name</Label>
                				<Col md={12}>
                					<Control.text className="form-control" placeholder="Your Name"
                					model=".author" name="author" 
                					validators={{
                							required, minLength: minLength(3), maxLength: maxLength(15)
                					}}/>
                					<Errors className="text-danger" 
                							model=".author"
                                        	show="touched"
                                        	messages={{
                                            required: 'Required ',
                                            minLength: 'Must be greater than 2 characters ',
                                            maxLength: 'Must be 15 characters or less '
                                        }}/>
                				</Col>
                			</Row>	
                			<Row className="form-group">
                				<Label htmlFor="comment" className="ml-3">Comment</Label>
                				<Col md={12}>
                					<Control.textarea model=".comment" name="comment" rows="8" className="form-control"/>
                				</Col>
                			</Row>
                			<Row className="form-group">
                                <Col md={{size:10}}>
                                    <Button type="submit" color="primary">
                                    	Submit
                                    </Button>
                                </Col>
                            </Row>
                		</LocalForm>
                	</ModalBody>
                </Modal>
			</React.Fragment>
			);
	}
}

class DishDetail extends React.Component {
	
	constructor(props){
		super(props);
	}

	render(){
		if (this.props.isLoading) {
            return(
                <div className="container">
                    <div className="row">            
                        <Loading />
                    </div>
                </div>
            );
        }
        else if (this.props.errMess) {
            return(
                <div className="container">
                    <div className="row">            
                        <h4>{this.props.errMess}</h4>
                    </div>
                </div>
            );
        }
        else if (this.props.dish != null) {
        	const comments = this.props.comments.map((comm)=>{
			return (
                    <Fade in>
                        <li key={comm.id}>
                        <p>{comm.comment}</p>
                        <p>-- {comm.author} , {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(comm.date)))}</p>
                        </li>
                    </Fade>
                );
		});
		
			return (
				<div className="container">
	                <div className="row">
	                    <Breadcrumb>
	                        <BreadcrumbItem><Link to="/menu">Menu</Link></BreadcrumbItem>
	                        <BreadcrumbItem active>{this.props.dish.name}</BreadcrumbItem>
	                    </Breadcrumb>
	                    <div className="col-12">
	                        <h3>{this.props.dish.name}</h3>
	                        <hr />
	                    </div>                
	                </div>
					<div className="row">
						<div  className="col-12 col-md-5 m-1">
							<FadeTransform in transformProps={{
                    		exitTransform: 'scale(0.5) translateY(-50%)'
                			}}>
							<Card>
								<CardImg src={baseUrl+this.props.dish.image} width="100%"/>
								<CardBody>
									<CardTitle>{this.props.dish.name}</CardTitle>
									<CardText>{this.props.dish.description}</CardText>
								</CardBody>
							</Card>
							</FadeTransform>
						</div>
						<div className="col-12 col-md-5">
							<h1>Comments</h1>
                            <Stagger in>
                                <ul className="list-unstyled">
    							     {comments}
                                </ul>
    							<CommentForm postComment={this.props.postComment} dishId={this.props.dish.id}/> 
                            </Stagger>
						</div>
					</div>
				</div>
			);
		}
	}	
}

export default DishDetail;