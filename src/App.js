import React from "react";
import { v4 as uuidv4 } from 'uuid';
import ReactCardFlip from "react-card-flip";
import { Swiper, SwiperSlide } from "swiper/react";
import { Keyboard } from "swiper";

import "./App.css";
import "swiper/css";
import "swiper/css/keyboard";

import questions from "./questions.json";

class App extends React.Component {
    constructor() {
        super();

		const shuffledKeyedQuestions = questions.map(q => ({...q, key: uuidv4()})).sort(q => q['key']);

        this.state = {
            currentKey: shuffledKeyedQuestions[0]['key'],
            questions: shuffledKeyedQuestions,
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
	                <img className="image" src={data[side]["data"]} alt={data[side]["data"]} />
	            </div>
            );
        }
    }

    generateFlipCards() {
		return this.state.questions.map(data => {
            return (
            	<SwiperSlide key={data['key']}>
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
                spaceBetween={50}
                keyboard={{ enabled: true }}
                onSlideChange={(e) => {
                	this.setState(() => ({
                		isFlipped: false,
                		currentKey: this.state.questions[e.snapIndex]['key']
                	}));
                }}
            >
                {this.generateFlipCards()}
            </Swiper>
        );
    }
}

export default App;