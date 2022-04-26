import React from "react";
import { v4 as uuidv4 } from 'uuid';
import ReactCardFlip from "react-card-flip";
import { Swiper, SwiperSlide } from "swiper/react";
import { Keyboard } from "swiper";

import "./App.css";
import "swiper/css";
import "swiper/css/keyboard";

import test from "./images/test.jpeg";

const questions = [
    {
    	key: uuidv4(),
    	isFlipped: false,
        front: { type: "text", data: "Que mesure l'échelle de Beaufort?" },
        back: { type: "text", data: "L'état de mer associé a une vitesse de vent" }
    },
    {
    	key: uuidv4(),
    	isFlipped: false,
        front: { type: "text", data: "Another great question" },
        back: { type: "image", data: test, alt: "Picture of boat" }
    },
].sort(() => Math.random() - 0.5);


class App extends React.Component {
    constructor() {
        super();

        this.state = {
            currentKey: questions[0]['key'],
            isFlipped: false
        };

        this.handleClick = this.handleClick.bind(this);
        this.generateFlipCards = this.generateFlipCards.bind(this);
        this.generateFlipCardSide = this.generateFlipCardSide.bind(this);
    }

    handleClick(e) {
        e.preventDefault();
        this.setState((prevState) => ({isFlipped: !prevState.isFlipped}));
    }

    generateFlipCardSide(data, side) {
        if (data[side]["type"] === "text") {
            return (
                <div className="card" onClick={this.handleClick}>
                    <p className="text">{data[side]["data"]}</p>
                </div>
            );
        }
        else if (data[side]["type"] === "image") {
            return (
                <div className="card" onClick={this.handleClick}>
	                <img className="image" src={data[side]["data"]} alt={data[side]["alt"]} />
	            </div>
            );
        }
    }

    generateFlipCards() {
		return questions.map(data => {
            return (
            	<SwiperSlide id={data['key']}>
		        	<ReactCardFlip isFlipped={this.state.isFlipped && this.state.currentKey === data['key']}>
		                {this.generateFlipCardSide(data, 'front')}
		                {this.generateFlipCardSide(data, 'back')}
		            </ReactCardFlip>
		        </SwiperSlide>
            );
        });
    }

    render() {
        return (
            <Swiper
                modules={[Keyboard]}
                slidesPerView={1}
                spaceBetween={0}
                keyboard={{ enabled: true }}
                onSlideChange={(e) => {
                	this.setState(() => ({
                		isFlipped: false,
                		currentKey: questions[e.snapIndex]['key']
                	}));
                }}
            >
                {this.generateFlipCards()}
            </Swiper>
        );
    }
}

export default App;