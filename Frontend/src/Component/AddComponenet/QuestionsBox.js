import { useEffect, useRef, useState } from "react";
import Slider from "react-slick";
import $ from "jquery";

import ServerAPI from "../../WebService/Server/ServerAPI";

import RegisterSelling from "./RegisterSelling";
import { useAuthContext } from "../LocalData/AuthToken";
import { useDispatch } from "react-redux";
import { QuetionDetails } from "../../Redux/QuetionSlice";
import { PriceDataDetails } from "../../Redux/DataPriceSlice";
import Get from "../../WebService/Fuction/Get";
import { PostData } from "../../WebService/Fuction/Post";

let currentStep = 0;
let totalStepCount = 0; //
let totalWidth = 100; //
let widthPerStep = 0; //
var questionCount = 0; //
var reminderStep = 0; //

var counter1 = 0; //
var indexPerSlide = 4; //
var processBarWidth = 15;
var totalStepTemp = 0;
var widthPerStepTemp = 0;
var slideRanges = [];

let totalQuest = 0; // Initial Step Count
let totalProccWidth = 70; //
let currentQuest = 1; //
let currentProccWidth = 0;
let perQuestWidth = 0;
export default function QuestionsBox() {
  var { token, getIsDetailInTC } = useAuthContext();
  var dispatch = useDispatch();
  const [questions, setQuestions] = useState([]);
  const [excellentPrice, setExcellentPrice] = useState(null);
  const [excellent, setExcellent] = useState(null);
  const [count, setCount] = useState(0);

  const sliderRefs = useRef(null);

  const sliderRef = useRef(null);

  var settings = {
    infinite: false,
    speed: 300,
    slidesToShow: 1,
    slidesToScroll: 1,
    slidesToShow: 1,
    adaptiveHeight: true,
    draggable: false,
    swipe: false,
    swipeToSlide: false,
    touchMove: false,
    draggable: false,
    accessibility: false,
    arrows: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: false,
          arrows: false,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: false,
          arrows: false,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: false,
          arrows: false,
        },
      },
    ],
  };

  useEffect(() => {
    fetchData();
  }, [token, getIsDetailInTC]);

  const fetchData = async () => {
    const userInfoCateId = getIsDetailInTC.ProductCatId;

    try {
      Get(
        userInfoCateId
          ? `${ServerAPI.GetListofQuestions}?catid=${userInfoCateId}`
          : `${ServerAPI.GetListofQuestions}?catid=1`,
        token
      )
        .then(handleResponse)
        .then(processGetQuetion)
        .catch(handleError);
    } catch (error) {
      console.log(error);
    }
  };
  const handleResponse = (response) => {
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.json();
  };
  const handleError = (error) => {
    console.log("Error fetching user role:", error);
  };
  const processGetQuetion = (result) => {
    if (result.status) {
      setQuestions(result.data);
    } else {
      setQuestions(result.data);
    }

    counter1 = result.data.length;
    questionCount = counter1 - 1;
    totalStepCount = questionCount / indexPerSlide;
    totalStepCount = parseInt(totalStepCount);
    reminderStep = questionCount % indexPerSlide;
    if (reminderStep > 0) {
      totalStepCount = totalStepCount + 1;
    }
    widthPerStep = totalWidth / totalStepCount;
    totalStepTemp = totalStepCount + 2;
    widthPerStepTemp = totalWidth / totalStepTemp;
    widthPerStep = widthPerStepTemp;
  };

  const renderQuestions = () => {
    slideRanges = [];
    let childSlideArray = [];
    let k = 1;

    while (k <= questions.length) {
      childSlideArray.push(k);

      if (childSlideArray.length === 1 || k === questions.length) {
        slideRanges.push([...childSlideArray]);
        childSlideArray = [];
      }
      k++;
      while (k <= questions.length) {
        childSlideArray.push(k);

        if (childSlideArray.length === 4 || k === questions.length) {
          slideRanges.push([...childSlideArray]);

          childSlideArray = [];
        }

        k++;
      }
    }

    return (
      <div class="slick-list">
        <div
          class="slick-track demoHeight"
          style={{
            opacity: "1",
            width: "auto",
            transform: "translate3d(0px, 0px, 0px)",
          }}
        >
          {" "}
          <Slider ref={sliderRef} {...settings}>
            {slideRanges.map((slide, slideIndex) => (
              <div>
                <div key={`slide-${slideIndex}`} className="row">
                  {slide.map((questionIndex) => (
                    <div
                      key={`question-${questionIndex}`}
                      className="col-lg-6  col-12 ProdQuestions"
                    >
                      <div
                        id={`question-${questionIndex}`}
                        className="card mt-3 mb-3 question"
                      >
                        <div className="card-header QuestionText">
                          <p className="d-flex">
                            {questionIndex}.
                            <p className="text-lg-start">
                              {questions[questionIndex - 1].qcquestion}
                            </p>
                          </p>
                        </div>
                        <div className="card-body">
                          <img
                            src={
                              questions
                                ? questions[
                                    questionIndex - 1
                                  ].questionsImage.replace("\\", "/")
                                : "/demo.png"
                            }
                            height="100%"
                            width="100%"
                            alt={`Question ${questionIndex}`}
                          />
                        </div>
                        <div className="card-footer">
                          <select
                            id="validateDDL123"
                            onChange={validateDDL}
                            className="form-select question-option"
                            data-question={questionIndex}
                            name={`question_${questionIndex}`}
                            data-qcratingId={
                              questions[questionIndex - 1].qcratingId
                            }
                            required
                          >
                            <option disabled hidden selected>
                              --- Select ---
                            </option>
                            {questions[
                              questionIndex - 1
                            ].questionerLovidViewModels.map(
                              (questionOption) => (
                                <option
                                  id="selectFiled"
                                  key={questionOption.questionerLovid}
                                  data-questionerLovid={
                                    questions[questionIndex - 1].questionerLovid
                                  }
                                  data-ratingWeightage={
                                    questions[questionIndex - 1].ratingWeightage
                                  }
                                  value={questionOption.questionerLovid}
                                >
                                  {questionOption.questionerLovname}
                                </option>
                              )
                            )}
                          </select>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </div>
    );
  };

  const goToNextSlide = () => {
    if (currentStep <= totalStepCount) {
      sliderRef.current.slickNext();
      sliderRefs.current.scrollIntoView({
        behavior: "smooth",
      });

      currentStep = sliderRef.current.innerSlider.state.currentSlide + 1;

      $("#previousbtn").show();
      if (currentStep >= totalStepCount) {
        displayShowPriceBtn();
      }
    }
    if (currentStep >= totalStepCount) {
      currentStep = currentStep + 1;
    }
    if (currentStep > totalStepCount + 1) {
      checkDataValidations();
      scrollToFirstUnansweredQuestion();
    }
  };

  const goToPrevSlide = () => {
    $("#nextbtn").show();
    $("#ExactPriceBtnPrice").hide();

    if (currentStep > 0) {
      sliderRef.current.slickPrev();
      var currentStepsss = sliderRef.current.innerSlider.state.currentSlide;

      if (currentStepsss == 1) {
        $("#previousbtn").hide();
      }
      if (currentStep != 0) {
        currentStep = sliderRef.current.innerSlider.state.currentSlide - 1;
      }

      // goToProcessBar();
    }
  };

  const scrollToFirstUnansweredQuestion = () => {
    const unansweredQuestion = document.querySelector(
      ".question-option.border-danger"
    );

    if (unansweredQuestion) {
      const closestSlide = unansweredQuestion.closest(".slick-slide");
      const slideParent = closestSlide ? closestSlide.parentNode : null;

      if (slideParent) {
        const slideChildren = Array.from(slideParent.children);
        var unansweredQuestionIndex = slideChildren.indexOf(closestSlide);

        if (unansweredQuestionIndex !== -1 && sliderRef && sliderRef.current) {
          sliderRef.current.slickGoTo(unansweredQuestionIndex);

          $("html, body").animate(
            {
              scrollTop:
                $(".question-option.border-danger").offset().top -
                $(window).height() / 2,
            },
            300
          );

          currentStep = unansweredQuestionIndex;
          // goToProcessBar();
        } else {
          console.log("Slider reference is not available or invalid index.");
        }
      } else {
        console.log("Slide parent element not found.");
      }
    } else {
      console.log("Unanswered question element not found.");
    }
  };

  const checkDataValidations = () => {
    var IsInvalidCount = 0;
    $(".question-option").each(function () {
      if ($(this).val() === null) {
        if (!$(this).next().hasClass("unanswered-error")) {
          $(this).addClass("border-danger");
          $(this).after(
            '<p class="unanswered-error text-danger m-0">This is a mandatory question</p>'
          );
          IsInvalidCount = IsInvalidCount + 1;
        } else {
          IsInvalidCount = IsInvalidCount + 1;
        }
      } else {
        if ($(this).next().hasClass("unanswered-error")) {
          $(this).removeClass("border-danger");
          $(".text-danger").remove().after(this.id);
        }
      }
    });

    if (IsInvalidCount == 0 && currentStep == totalStepCount + 2) {
      $("#nextbtn").hide();
      $("#ExactPriceBtnPrice").show();
    } else {
      $("#nextbtn").show();
      $("#ExactPriceBtnPrice").hide();
    }
  };

  const displayShowPriceBtn = () => {
    var IsInvalidCount = 0;
    $(".question-option").each(function () {
      if ($(this).val() === null) {
        IsInvalidCount = IsInvalidCount + 1;
      }
      if ($(this).next().hasClass("unanswered-error")) {
        IsInvalidCount = IsInvalidCount + 1;
      }
    });

    if (IsInvalidCount == 0 && currentStep >= totalStepCount) {
      $("#nextbtn").hide();
      $("#ExactPriceBtnPrice").show();
    } else {
      $("#nextbtn").show();
      $("#ExactPriceBtnPrice").hide();
    }
  };

  const validateDDL = (event) => {
    if (
      $(event.target).next().hasClass("unanswered-error") ||
      $(event.target).next().hasClass("border-danger")
    ) {
      console.log("(event.target)", $(event.target));
      $(event.target).next().removeClass("unanswered-error");
      $(event.target).removeClass("border-danger");
      $(event.target).next().text("");
    }

    if (currentStep >= totalStepCount) {
      displayShowPriceBtn();
    }
  };

  var ExactPriceBtns = (event) => {
    event.preventDefault();
    InsertQuestions();
  };
  var NonWorkingPrice = () => {
    $("#QuestionsFieldset").hide();
    $("#ResultFieldset").show();
  };

  const InsertQuestions = async () => {
    var ProdQuestionCount = $(".ProdQuestions").length;

    const updatedQuestiondataArray = [];

    var j = 1;
    for (var i = 0; i < ProdQuestionCount; i++) {
      var questionerLovidValue = parseInt(
        $("#question-" + j + " select")
          .find(":selected")
          .data("questionerlovid")
      );

      if (isNaN(questionerLovidValue)) {
        questionerLovidValue = 1;
      }

      var ratingWeightageValue = parseInt(
        $("#question-" + j + " select")
          .find(":selected")
          .data("ratingweightage")
      );
      if (isNaN(ratingWeightageValue)) {
        ratingWeightageValue = 0;
      }

      var conditionValue = parseInt(
        $("#question-" + j + " select")
          .find(":selected")
          .val()
      );
      var condition = null;
      if (!isNaN(conditionValue)) {
        condition = conditionValue;
      }

      var Questiondata = {
        qcratingId: $("#question-" + j + " select").data("qcratingid"),
        productCatId: 1,
        qcquestion: $("#question-" + j + " .QuestionText span").text(),
        ratingWeightage: ratingWeightageValue,
        questionerLovid: questionerLovidValue,

        condition: condition,
        averageSellingPrice: 59400,
        sweetner: 0.0,
        commentByQC: "N/A",
      };

      j++;

      updatedQuestiondataArray.push(Questiondata);
    }
    dispatch(QuetionDetails(updatedQuestiondataArray));

    var allData = JSON.stringify(updatedQuestiondataArray);

    PostData(ServerAPI.GetNewQuatedPricev2, allData, token)
      .then(handleResponse)
      .then(processGetexcellentPrice)
      .catch(handleError);
  };
  const processGetexcellentPrice = (result) => {
    if (result.status) {
      NonWorkingPrice();
      setExcellentPrice(result.data.excellentPrice);
      dispatch(PriceDataDetails(result.data));
      setExcellent(result.data);
    } else {
      NonWorkingPrice();
    }
  };

  $(document).on("change", "#question-1 select", function () {
    if ($("#question-1 select").val() == "6") {
      $(".ProdQuestions").show();
      $(".ProdQuestions").addClass("ProdQuestions-bordered");
      $("#ExactPriceBtnPrice").hide();
      $("#nextbtn").show();
    } else {
      $("#nextbtn").hide();
      $("#QuestionsFieldset").hide();
      $("#ResultFieldset").show();
      $(".AnswersBox ul").remove();

      var questionText = $("#question-1 .QuestionText").text();
      var answerHtml =
        "<ul><li>" +
        questionText +
        "</li><li>" +
        $("option:selected", this).text() +
        "</li></ul>";
      $(".AnswersBox").append(answerHtml);

      $("#ExactPriceBtnPrice").show();
      $("#nextbtn").hide();
    }
  });

  $(document).on("change", ".question-option", function () {
    $(".AnswersBox").animate(
      { scrollTop: $(".AnswersBox").prop("scrollHeight") },
      1000
    );

    var questionText = $(this).closest(".card").find(".QuestionText").text();

    var existingAnswer = $(".AnswersBox")
      .find("ul")
      .filter(function () {
        return $(this).find("li:first").text() === questionText;
      });

    if (existingAnswer.length > 0) {
      existingAnswer.find("li:last").text($("option:selected", this).text());
    } else {
      var answerHtml =
        "<ul><li>" +
        questionText +
        "</li><li>" +
        $("option:selected", this).text() +
        "</li></ul>";
      var questionNumber = parseInt(questionText.match(/^\d+/));
      var inserted = false;
      $(".AnswersBox ul").each(function () {
        var currentQuestionNumber = parseInt(
          $(this).find("li:first").text().match(/^\d+/)
        );
        if (questionNumber < currentQuestionNumber) {
          $(this).before(answerHtml);
          inserted = true;
          return false;
        }
      });
      if (!inserted) {
        $(".AnswersBox").append(answerHtml);
      }
    }

    var numberOfAnswers = $(".AnswersBox ul").length - 1;

    if (numberOfAnswers) {
      totalQuest = counter1;
      perQuestWidth = totalProccWidth / totalQuest;
      var Process = perQuestWidth * numberOfAnswers;
      currentProccWidth = 20 + Process;

      $(".progress-bar").css("width", `${currentProccWidth}%`);
    } else {
      if ($("#question-1 select").val() != "6") {
        currentProccWidth = 20 + 70;
        $(".progress-bar").css("width", `${currentProccWidth}%`);
        var ProdQuestionCount = $(".ProdQuestions").length;

        const updatedQuestiondataArray = [];

        var j = 1;
        for (var i = 0; i < ProdQuestionCount; i++) {
          var questionerLovidValue = parseInt(
            $("#question-" + j + " select")
              .find(":selected")
              .data("questionerlovid")
          );

          if (isNaN(questionerLovidValue)) {
            questionerLovidValue = 1;
          }

          var ratingWeightageValue = parseInt(
            $("#question-" + j + " select")
              .find(":selected")
              .data("ratingweightage")
          );
          if (isNaN(ratingWeightageValue)) {
            ratingWeightageValue = 0;
          }

          var conditionValue = parseInt(
            $("#question-" + j + " select")
              .find(":selected")
              .val()
          );
          var condition = null;
          if (!isNaN(conditionValue)) {
            condition = conditionValue;
          }

          var Questiondata = {
            qcratingId: $("#question-" + j + " select").data("qcratingid"),
            productCatId: 1,
            qcquestion: $("#question-" + j + " .QuestionText span").text(),
            ratingWeightage: ratingWeightageValue,
            questionerLovid: questionerLovidValue,

            condition: condition,
            averageSellingPrice: 59400,
            sweetner: 0.0,
            commentByQC: "N/A",
          };

          j++;

          updatedQuestiondataArray.push(Questiondata);
        }
        dispatch(QuetionDetails(updatedQuestiondataArray));
        setExcellentPrice(null);
      } else {
        dispatch(QuetionDetails({ isActive: false }));
        totalQuest = counter1;
        perQuestWidth = totalProccWidth / totalQuest;
        var Process = perQuestWidth * numberOfAnswers;

        currentProccWidth = 20 + Process;

        $(".progress-bar").css("width", `${currentProccWidth}%`);
      }
    }
  });

  return (
    <div>
      <div id="exactvalue">
        <fieldset
          className="container mt-2 mb-5 overflow-hidden"
          id="QuestionsFieldset"
        >
          <div className="row">
            <div className="col-lg-9 col-md-12 col-sm-12 p-2">
              <div
                className="p-3"
                style={{
                  backgroundColor: "#FCFCFF",
                  border: "1px solid #DDE2FF",
                  borderRadius: "12px",
                }}
              >
                <div
                  id="QuestionBox"
                  ref={sliderRefs}
                  class="slick-initialized slick-slider demoSlider"
                >
                  {renderQuestions()}
                </div>

                <div className="justify-content-end row ">
                  <div className="AllQuestionSelectedYes col-12 d-flex justify-content-end">
                    <button
                      type="button"
                      id="previousbtn"
                      style={{ display: "none" }}
                      className="previous btn btn-light btn-previous text-uppercase mx-3 px-4 poppins-SemiBold slick-arrow"
                      onClick={goToPrevSlide}
                    >
                      Previous
                    </button>
                    <input
                      style={{ display: "none" }}
                      type="button"
                      name="next"
                      className="btn btn-gradient btn-next text-uppercase mr-2 px-4 poppins-SemiBold"
                      value="Show Price"
                      id="ExactPriceBtnPrice"
                      onClick={ExactPriceBtns}
                    />

                    {/* <input
                      style={{ display: "none" }}
                      type="button"
                      name="next"
                      className="next btn btn-gradient btn-next text-uppercase mr-2 px-4 poppins-SemiBold slick-arrow"
                      value="Show Price"
                      id="NonWorkingPricebtn"
                      onClick={NonWorkingPrice}
                    /> */}

                    <button
                      style={{ display: "none" }}
                      type="button"
                      id="nextbtn"
                      className="next btn btn-gradient btn-next text-uppercase mr-2 px-4 poppins-SemiBold slick-arrow"
                      onClick={goToNextSlide}
                    >
                      Next
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-12 col-sm-12">
              <div
                class="p-3 AnswersBox"
                style={{
                  height: "100%",
                  background: "#F9FAFF",
                  border: "1px solid #DDE2FF",
                  borderRadius: "border-radius: 12px",
                }}
              ></div>
            </div>
          </div>
        </fieldset>

        <fieldset
          className="container mt-5 mb-5 overflow-hidden"
          id="ResultFieldset"
        >
          <RegisterSelling value={excellentPrice} data={excellent} />
        </fieldset>
      </div>
    </div>
  );
}
