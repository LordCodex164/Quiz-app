import React, { useEffect, useState } from "react"
import {VscMenu} from "react-icons/vsc"
import {FaUserAlt} from "react-icons/fa"
import { FiEdit2 } from 'react-icons/fi';
import { Link } from "react-router-dom";
import { useGlobalContext } from "../../AuthContext"
import { AiOutlineDelete } from 'react-icons/ai';
import UpdateModal from './updateQuiz'
import AddQuestion from "./addquestion"

const EditQuizPage = () => {
    const [quizDetails, setQuizDetails] = useState([])
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [quizId, setQuizId] = useState(null);
    const [quizName, setQuizName] = useState(null)
    const [quizDescription, setQuizDescription] = useState(null)
    const [quizTimeLimit, setQuizTimeLimit] = useState(null)
    const [quizPoints, setQuizPoints] = useState(null)
    const {getQuizDetails, deleteQuizDetails, showModal, showQuestionModal,
      handleOpenModal, handleCloseModal, handleOpenQuestionModal, handleCloseQuestionModal,} = useGlobalContext()

    const handleFetchQuizDetails = async () => {
         try{
          const data = await getQuizDetails()
          
           const {allTasks} = data
           setQuizDetails(allTasks)
         } catch(error){
            console.log(error)
         }
    }
    useEffect(() => {
         handleFetchQuizDetails()
    },[])

   const handleDeleteDetails = async (id) => {
        try {
         await deleteQuizDetails(id)
         window.location.reload()
           
        } catch(error){
           console.log(error)
        }

   }

   const handleIsModalOpen = (id, name, description, timeLimit, points) => {
     setIsModalOpen(true) // Set the quiz id in the state
     setQuizId(id)
     setQuizName(name)
     setQuizDescription(description)
     setQuizTimeLimit(timeLimit)
     setQuizPoints(points)
  }

  const handleIsModalClose = () => {
    setIsModalOpen(false) // Set the quiz id in the state
 }

 const handleIsQuestionModalOpen = (id) => {
  handleOpenQuestionModal()// Set the quiz id in the state
  setQuizId(id)
}
  

    return (
        <div>
          <nav className='bg-blue-400 p-5 '>
           <div className='flex flex-row justify-between'>
             <div className="flex justify-center items-center">
            {<VscMenu/>}
             </div>

              <div>
              <h1 className='font-poppins font-semibold '><Link className="limkk" to={"/"}>Quiz App </Link></h1>
             </div>

            <div className='flex justify-center items-center text-[25px]'>
            {<FaUserAlt/>}
            </div>

      </div>
         </nav>

         <div className="text-center p-3 mt-4">
  <h2 className="text-2xl font-bold mb-2">Your Created Quizzes</h2>
  <div className="shadow-sm pt-3 pb-3 font-poppins bg-transparent">
    {quizDetails.map((detail) => {
      const { name, timeLimit, description, points, _id, questions } = detail;
      return (
        <div className="flex flex-col" key={_id}>
         
          <div className="flex flex-row justify-between shadow-md mt-3 p-3 bg-black rounded-md">

            <div className="flex flex-col items-center justify-center">
              <p className="text-white font-poppins font-thin">{name}</p>
              <div className="add-question-btn">
                <button onClick={() => handleIsQuestionModalOpen(_id)} className="bg-blue-600 text-white font-poppins">
                  Add Question
                </button>
              </div>
            </div>
      
      
      <div className="flex flex-col items-center justify-center gap-3">
        <div className="flex flex-row gap-3">
             <FiEdit2 onClick={() => handleIsModalOpen(_id, name, description, timeLimit, points)} />
              <AiOutlineDelete onClick={() => handleDeleteDetails(_id)} />
          </div>
          {questions.length > 0 &&
          <div>
            <button className="bg-green-500 font-poppins text-white">View Questions</button>
          </div>
          }
          
      </div>
            

            {isModalOpen && (
              <div className={`${
                handleOpenModal ? 'modal-overlay show-modal' : 'modal-overlay'
              }`}>
                <div className="modal-container">
                  <UpdateModal name={quizName} id={quizId} description={quizDescription} timeLimit={quizTimeLimit} points={quizPoints} handleModalClose={handleIsModalClose} handleIsModalClose={handleIsModalClose} />
                </div>
              </div>
            )}

            {showQuestionModal && (
              <div className={`${
                handleOpenModal ? 'modal-overlay show-modal' : 'modal-overlay'
              }`}>
                <div className="modal-container">
                  <AddQuestion id={quizId}  handleCloseQuestionModal={handleCloseModal} />
                </div>
              </div>
            )} 
          </div>

           <div className="mt-3 p-3 bg-white rounded-md shadow-md">
            <form>
              <div className="flex flex-col">
                <label className="text-gray-700 font-semibold mb-2" htmlFor="timeLimit">
                  Time Limit (in minutes):
                </label>
                <input
                  type="number"
                  name="timeLimit"
                  id="timeLimit"
                  value={timeLimit}
                  className="border border-gray-500 rounded-md px-3 py-2"
                  disabled
                />
              </div>

              <div className="flex flex-col mt-3">
                <label className="text-gray-700 font-semibold mb-2" htmlFor="description">
                  Description:
                </label>
                <textarea
                  name="description"
                  id="description"
                  value={description}
                  className="border border-gray-500 rounded-md px-3 py-2"
                  disabled
                ></textarea>
              </div>

              <div className="flex flex-col mt-3">
                <label className="text-gray-700 font-semibold mb-2" htmlFor="points">
                  Point Grading System:
                </label>
                <input
                  type="number"
                  name="points"
                  id="points"
                  value={points}
                  className="border border-gray-500 rounded-md px-3 py-2"
                  disabled
                />
              </div>
            </form>
          </div>
        </div>
      );
    })}
  </div>
</div>

          
 
        </div>
    )
}

export default EditQuizPage 