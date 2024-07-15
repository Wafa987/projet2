// // import axios from 'axios';
// // import { React, useEffect, useState } from 'react';
// // import { FaBoxOpen, FaCheck, FaEnvelopeOpen, FaSearch, FaTrash, FaUserTimes } from 'react-icons/fa';
// // import { useNavigate } from 'react-router-dom';
// // import EmailComponent from '../components/emailComponent.jsx';

// // function Inbox() {
// //   const Navigate = useNavigate();
// //   const [data, setData] = useState([]);
// //   const [totalPages, setTotalPages] = useState(0);
// //   let [currentPage, setCurrentPage] = useState(1);

// //   const handleMailClick = (mailId) => {
// //     // Naviguer vers le contenu de l'e-mail
// //     Navigate(`/DetailedEmail/${mailId}`);
// //   };

// //   const getAllEmails = () => {
// //     const instance = axios.create({
// //       withCredentials: true
// //     });

// //     const params = {
// //       pageSize: 10,
// //       pageNumber: currentPage,
// //       emailReceiver: localStorage["email"]
// //     };

// //     instance.get(`${process.env.REACT_APP_API_LINK}emails/inbox`, { params: params })
// //       .then(function (res) {
// //         setData(res.data.emails);
// //         setTotalPages(res.data.totalPages);
// //         setCurrentPage(res.data.page);
// //       })
// //       .catch(function (error) {
// //         console.log(error);
// //       });
// //   };

// //   const formatDate = (date) => {
// //     return date.substring(0, 10) + " " + date.substring(11, 16);
// //   };

// //   const getNext = () => {
// //     if (currentPage >= totalPages) return;
// //     currentPage = Number(currentPage) + 1;
// //     getAllEmails();
// //   };

// //   const getPrevious = () => {
// //     currentPage = Number(currentPage) - 1;
// //     if (currentPage < 1) return;
// //     getAllEmails();
// //   };

// //   useEffect(() => {
// //     getAllEmails();
// //   }, []);

// //   return (
// //     <div className="rounded">
// //       <table cellSpacing={2} cellPadding={5} border={1} className="border-collapse table-fixed w-full text-sm bg-white text-left">
// //         <thead>
// //           <th colSpan={1} className="leftborder">
// //             <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-mail-opened" width={20} height={20} viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
// //               <path stroke="none" d="M0 0h24v24H0z" fill="none" />
// //               <path d="M3 9l9 6l9 -6l-9 -6l-9 6" />
// //               <path d="M21 9v10a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2v-10" />
// //               <path d="M3 19l6 -6" />
// //               <path d="M15 13l6 6" />
// //             </svg>
// //           </th>
// //           <th colSpan={2}>From</th>
// //           <th colSpan={1}>cc</th>
// //           <th colSpan={5} >Subject</th>
// //           <th colSpan={2}>Date</th>
// //           <th colspan={1} className="rightborder"></th>
// //         </thead>
// //         <tbody>
// //           {data?.map((i) => {
// //             return (
// //               <tr>
// //                 <td colSpan={0} className={`py-2 px-4 border-b border-gray-200 ${i.read === 0 ? 'unread' : ''}`}>
// //                   <span>{i.read === 0 ? '-' : '+'}</span>
// //                 </td>
// //                 <td colSpan={2} className="py-2 px-4 border-b border-gray-200">{i.email_sender}</td>
// //                 <td colSpan={2} className="py-2 px-4 border-b border-gray-200">{i.cc}</td>
// //                 <td colSpan={5} className="py-2 px-4 border-b border-gray-200">{i.subject}</td>
// //                 <td colspan={2} className="py-2 px-4 border-b border-gray-200">{formatDate(i.sending_date)}</td>
// //                 <td colspan={1} className="py-2 px-4 border-b border-gray-200 text-right">
// //                   <p className="flex text-xs">
// //                     <a href="#"> <EmailComponent id={i._id} /></a>
// //                     <a href="#"><FaSearch key={i._id} onClick={() => handleMailClick(i._id)} className="text-gray-600 mx-2"></FaSearch></a>
// //                   </p>
// //                 </td>
// //               </tr>
// //             );
// //           })}
// //         </tbody>
// //       </table>
// //       <div className=" float-right mt-2">
// //         <div class="flex flex-col items-center">
// //           <div class="inline-flex mt-2 xs:mt-0">
// //             <button onClick={() => getPrevious()} class="flex items-center justify-center px-3 h-8 text-sm font-medium text-white bg-blue-500 rounded hover:bg-gray-900">
// //               Prev
// //             </button>
// //             <span class="text-sm text-gray-700 mx-3 my-1">
// //               Page <span class="font-semibold text-gray-900">{currentPage}</span> / <span class="font-semibold text-gray-900">{totalPages}</span>
// //             </span>
// //             <button onClick={() => getNext()} class="flex items-center justify-center px-3 h-8 text-sm font-medium text-white bg-blue-500 border-gray-700 rounded hover:bg-gray-900">
// //               Next
// //             </button>
// //           </div>
// //         </div>
// //       </div>
// import axios from 'axios';
// import { React, useEffect, useState } from 'react';
// import { FaBoxOpen, FaCheck, FaEnvelopeOpen, FaSearch, FaTrash, FaUserTimes } from 'react-icons/fa';
// import { useNavigate } from 'react-router-dom';
// import EmailComponent from '../components/emailComponent.jsx';

// function Inbox() {
//   const Navigate = useNavigate();
//   const [data, setData] = useState([]);
//   const [totalPages, setTotalPages] = useState(0);
//   let [currentPage, setCurrentPage] = useState(1);

//   const markAsRead = async (mailId) => {
//     try {
//       // Appel à l'API pour marquer l'e-mail comme lu
//       await axios.put(`${process.env.REACT_APP_API_LINK}emails/markAsRead/${mailId}`);
//     } catch (error) {
//       console.error('Error marking email as read:', error.message);
//     }
//   };

//   const handleMailClick = async (mailId) => {
//     // Appeler la fonction pour marquer l'e-mail comme lu
//     await markAsRead(mailId);

//     // Mettre à jour la liste des e-mails
//     getAllEmails();

//     // Naviguer vers le contenu de l'e-mail
//     Navigate(`/DetailedEmail/${mailId}`);
//   };

//   const getAllEmails = () => {
//     const instance = axios.create({
//       withCredentials: true
//     });

//     const params = {
//       pageSize: 10,
//       pageNumber: currentPage,
//       emailReceiver: localStorage["email"]
//     };

//     instance.get(`${process.env.REACT_APP_API_LINK}emails/inbox`, { params: params })
//       .then(function (res) {
//         setData(res.data.emails);
//         setTotalPages(res.data.totalPages);
//         setCurrentPage(res.data.page);
//       })
//       .catch(function (error) {
//         console.log(error);
//       });
//   };

//   const formatDate = (date) => {
//     return date.substring(0, 10) + " " + date.substring(11, 16);
//   };

//   const getNext = () => {
//     if (currentPage >= totalPages) return;
//     currentPage = Number(currentPage) + 1;
//     getAllEmails();
//   };

//   const getPrevious = () => {
//     currentPage = Number(currentPage) - 1;
//     if (currentPage < 1) return;
//     getAllEmails();
//   };

//   useEffect(() => {
//     getAllEmails();
//   }, []);

//   return (
//     <div className="rounded">
//       <table cellSpacing={2} cellPadding={5} border={1} className="border-collapse table-fixed w-full text-sm bg-white text-left">
//         <thead>
//           <th colSpan={1} className="leftborder">
//             <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-mail-opened" width={20} height={20} viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
//               <path stroke="none" d="M0 0h24v24H0z" fill="none" />
//               <path d="M3 9l9 6l9 -6l-9 -6l-9 6" />
//               <path d="M21 9v10a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2v-10" />
//               <path d="M3 19l6 -6" />
//               <path d="M15 13l6 6" />
//             </svg>
//           </th>
//           <th colSpan={2}>From</th>
//           <th colSpan={1}>cc</th>
//           <th colSpan={5} >Subject</th>
//           <th colSpan={2}>Date</th>
//           <th colspan={1} className="rightborder"></th>
//         </thead>
//         <tbody>
//           {data?.map((i) => {
//             return (
//               <tr>
//                 <td colSpan={0} className={`py-2 px-4 border-b border-gray-200 ${i.read === 0 ? 'unread' : ''}`}>
//                   <span>{i.read === 0 ? '-' : '+'}</span>
//                 </td>
//                 <td colSpan={2} className="py-2 px-4 border-b border-gray-200">{i.email_sender}</td>
//                 <td colSpan={2} className="py-2 px-4 border-b border-gray-200">{i.cc}</td>
//                 <td colSpan={5} className="py-2 px-4 border-b border-gray-200">{i.subject}</td>
//                 <td colspan={2} className="py-2 px-4 border-b border-gray-200">{formatDate(i.sending_date)}</td>
//                 <td colspan={1} className="py-2 px-4 border-b border-gray-200 text-right">
//                   <p className="flex text-xs">
//                     <a href="#"> <EmailComponent id={i._id} /></a>
//                     <a href="#"><FaSearch key={i._id} onClick={() => handleMailClick(i._id)} className="text-gray-600 mx-2"></FaSearch></a>
//                   </p>
//                 </td>
//               </tr>
//             );
//           })}
//         </tbody>
//       </table>
//       <div className=" float-right mt-2">
//         <div class="flex flex-col items-center">
//           <div class="inline-flex mt-2 xs:mt-0">
//             <button onClick={() => getPrevious()} class="flex items-center justify-center px-3 h-8 text-sm font-medium text-white bg-blue-500 rounded hover:bg-gray-900">
//               Prev
//             </button>
//             <span class="text-sm text-gray-700 mx-3 my-1">
//               Page <span class="font-semibold text-gray-900">{currentPage}</span> / <span class="font-semibold text-gray-900">{totalPages}</span>
//             </span>
//             <button onClick={() => getNext()} class="flex items-center justify-center px-3 h-8 text-sm font-medium text-white bg-blue-500 border-gray-700 rounded hover:bg-gray-900">
//               Next
//             </button>
//           </div>
//         </div>
//       </div>
//       <style>
//         {`
//       .rounded {
//         font-family: Arial, Helvetica, sans-serif;
//       }

//       .prevnex {
//         background-color: #395886;
//         padding: 5px 25px;
//         color: white;
//         border-radius: 20px;
//         font-size: 15px;
//       }

//       .prevnex:active {
//         opacity: 0.7;
//       }

//       th {
//         background-color: #f0f3fa;
//         padding: 5px;
//         font-family: Arial, Helvetica, sans-serif;
//         color: #395886;
//         font-weight: bold;
//         font-size: 14px;
//       }

//       .leftborder {
//         border-radius: 20px 0 0 20px;
//         padding-left: 20px;
//       }

//       .rightborder {
//         border-radius: 0 20px 20px 0;
//       }

//       .unread {
//         color: gray; /* ou toute autre couleur que vous souhaitez pour les e-mails non lus */
//       }
//          `}
//       </style>
//     </div>
//   );
// }

// export default Inbox;
import axios from 'axios';
import { React, useEffect, useState } from 'react';
import { FaBoxOpen, FaCheck, FaEnvelopeOpen, FaSearch, FaTrash, FaUserTimes } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import EmailComponent from '../components/emailComponent.jsx';

function Inbox() {
  const Navigate = useNavigate();
  const [data, setData] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  let [currentPage, setCurrentPage] = useState(1);

  const markAsRead = async (mailId) => {
    try {
      // Appel à l'API pour marquer l'e-mail comme lu
      await axios.put(`${process.env.REACT_APP_API_LINK}emails/markAsRead/${mailId}`);
    } catch (error) {
      console.error('Error marking email as read:', error.message);
    }
  };

  const handleMailClick = async (mailId) => {
    // Appeler la fonction pour marquer l'e-mail comme lu
    await markAsRead(mailId);

    // Mettre à jour la liste des e-mails
    getAllEmails();

    // Naviguer vers le contenu de l'e-mail
    Navigate(`/DetailedEmail/${mailId}`);
  };

  const getAllEmails = () => {
    const instance = axios.create({
      withCredentials: true
    });

    const params = {
      pageSize: 10,
      pageNumber: currentPage,
      emailReceiver: localStorage["email"]
    };

    instance.get(`${process.env.REACT_APP_API_LINK}emails/inbox`, { params: params })
      .then(function (res) {
        setData(res.data.emails);
        setTotalPages(res.data.totalPages);
        setCurrentPage(res.data.page);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const formatDate = (date) => {
    return date.substring(0, 10) + " " + date.substring(11, 16);
  };

  const getNext = () => {
    if (currentPage >= totalPages) return;
    currentPage = Number(currentPage) + 1;
    getAllEmails();
  };

  const getPrevious = () => {
    currentPage = Number(currentPage) - 1;
    if (currentPage < 1) return;
    getAllEmails();
  };

  useEffect(() => {
    getAllEmails();
  }, []);

  return (
    <div className="rounded">
      <table cellSpacing={2} cellPadding={5} border={1} className="border-collapse table-fixed w-full text-sm bg-white text-left">
        <thead>
          <th colSpan={1} className="leftborder">
            <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-mail-opened" width={20} height={20} viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M3 9l9 6l9 -6l-9 -6l-9 6" />
              <path d="M21 9v10a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2v-10" />
              <path d="M3 19l6 -6" />
              <path d="M15 13l6 6" />
            </svg>
          </th>
          <th colSpan={2}>From</th>
          <th colSpan={1}>cc</th>
          <th colSpan={5} >Subject</th>
          <th colSpan={2}>Date</th>
          <th colspan={1} className="rightborder"></th>
        </thead>
        <tbody>
          {data?.map((i) => {
            return (
              <tr className={i.read === 0 ? 'unread-row' : ''} onClick={() => handleMailClick(i._id)}>
                <td colSpan={0} className={`py-2 px-4 border-b border-gray-200 ${i.read === 0 ? 'unread' : ''}`}>
                  <span>{i.read === 0 ? '-' : '+'}</span>
                </td>
                <td colSpan={2} className="py-2 px-4 border-b border-gray-200">{i.email_sender}</td>
                <td colSpan={2} className="py-2 px-4 border-b border-gray-200">{i.cc}</td>
                <td colSpan={5} className="py-2 px-4 border-b border-gray-200">{i.subject}</td>
                <td colspan={2} className="py-2 px-4 border-b border-gray-200">{formatDate(i.sending_date)}</td>
                <td colspan={1} className="py-2 px-4 border-b border-gray-200 text-right">
                  <p className="flex text-xs">
                    <a href="#"> <EmailComponent id={i._id} /></a>
                    <a href="#"><FaSearch key={i._id} className="text-gray-600 mx-2"></FaSearch></a>
                  </p>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className=" float-right mt-2">
        <div class="flex flex-col items-center">
          <div class="inline-flex mt-2 xs:mt-0">
            <button onClick={() => getPrevious()} class="flex items-center justify-center px-3 h-8 text-sm font-medium text-white bg-blue-500 rounded hover:bg-gray-900">
              Prev
            </button>
            <span class="text-sm text-gray-700 mx-3 my-1">
              Page <span class="font-semibold text-gray-900">{currentPage}</span> / <span class="font-semibold text-gray-900">{totalPages}</span>
            </span>
            <button onClick={() => getNext()} class="flex items-center justify-center px-3 h-8 text-sm font-medium text-white bg-blue-500 border-gray-700 rounded hover:bg-gray-900">
              Next
            </button>
          </div>
        </div>
      </div>
      <style>
        {`
      .rounded {
        font-family: Arial, Helvetica, sans-serif;
      }

      .prevnex {
        background-color: #395886;
        padding: 5px 25px;
        color: white;
        border-radius: 20px;
        font-size: 15px;
      }

      .prevnex:active {
        opacity: 0.7;
      }

      th {
        background-color: #f0f3fa;
        padding: 5px;
        font-family: Arial, Helvetica, sans-serif;
        color: #395886;
        font-weight: bold;
        font-size: 14px;
      }

      .leftborder {
        border-radius: 20px 0 0 20px;
        padding-left: 20px;
      }

      .rightborder {
        border-radius: 0 20px 20px 0;
      }

      .unread {
        color: gray; /* ou toute autre couleur que vous souhaitez pour les e-mails non lus */
      }

      .unread-row {
        background-color: rgba(128, 128, 128, 0.3); /* Couleur grise transparente */
      }
         `}
      </style>
    </div>
  );
}

export default Inbox;

