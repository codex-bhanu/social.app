import React, { useState, useContext } from 'react'
import { AppContext } from '../../context/AppContext';
import './Share.css';

const Share = () => {
   const { addPost } = useContext(AppContext);
   const [desc, setDesc] = useState("");
   const [, setFile] = useState(null);
   const [imagePreview, setImagePreview] = useState(null);
   
   const [showTagInput, setShowTagInput] = useState(false);
   const [tagText, setTagText] = useState("");
   
   const [showLocationInput, setShowLocationInput] = useState(false);
   const [locationText, setLocationText] = useState("");
   
   const [showFeelingInput, setShowFeelingInput] = useState(false);
   const [feelingText, setFeelingText] = useState("");

   // Plan option states
   const [showPlanInput, setShowPlanInput] = useState(false);
   const [planTitle, setPlanTitle] = useState("");
   const [planDate, setPlanDate] = useState("");
   const [planLoc, setPlanLoc] = useState("");
   const [planCap, setPlanCap] = useState("10");

   const handleImageChange = (e) => {
      if (e.target.files && e.target.files[0]) {
         const selectedFile = e.target.files[0];
         setFile(selectedFile);
         setImagePreview(URL.createObjectURL(selectedFile));
      }
   };

   const handleShare = () => {
      if (showPlanInput) {
         if (!planTitle.trim()) {
            alert("Validation Error: Plan Title cannot be empty!");
            return;
         }
         if (!planDate) {
            alert("Validation Error: Plan Date is required!");
            return;
         }
         // Validate date not in past
         if (new Date(planDate).getTime() < Date.now()) {
            alert("Validation Error: Plan Date cannot be in the past!");
            return;
         }

         const planInfo = {
            isPlan: true,
            planTitle,
            planDate,
            planLocation: planLoc || "TBD",
            planCapacity: planCap || "10",
            planAttendees: [999] // Creator joins by default
         };

         addPost(desc || `Plan: ${planTitle}`, imagePreview, locationText, feelingText, tagText ? [tagText] : [], planInfo);
         
         // Reset state
         setDesc("");
         setImagePreview(null);
         setFile(null);
         setPlanTitle("");
         setPlanDate("");
         setPlanLoc("");
         setPlanCap("10");
         setShowPlanInput(false);
         setShowTagInput(false);
         setTagText("");
         setShowLocationInput(false);
         setLocationText("");
         setShowFeelingInput(false);
         setFeelingText("");
         alert("Plan published to feed!");
         return;
      }

      if (desc.trim() || imagePreview) {
         addPost(desc, imagePreview, locationText, feelingText, tagText ? [tagText] : []);
         // Reset state
         setDesc("");
         setImagePreview(null);
         setFile(null);
         setShowTagInput(false);
         setTagText("");
         setShowLocationInput(false);
         setLocationText("");
         setShowFeelingInput(false);
         setFeelingText("");
      }
   };

   return (
      <>
         <div className="share">
            <div className="shareWrapper">

               <div className="shareTop">
                  <img className="shareProfileImg" src="/assets/person/bhanu.jpg" alt="" />
                  <input
                     placeholder="What's on your mind, Bhanu?"
                     className="shareInput"
                     value={desc}
                     onChange={(e) => setDesc(e.target.value)}
                  />
               </div>

               {/* Image Preview Container */}
               {imagePreview && (
                  <div className="shareImgContainer" style={{ position: 'relative', margin: '15px 0' }}>
                     <img src={imagePreview} alt="" className="shareImg" style={{ width: '100%', maxHeight: '250px', objectFit: 'cover', borderRadius: '12px' }} />
                     <button 
                        className="shareCancelImg" 
                        onClick={() => {
                           setImagePreview(null);
                           setFile(null);
                        }}
                        style={{
                           position: 'absolute',
                           top: '10px',
                           right: '10px',
                           backgroundColor: 'rgba(15, 23, 42, 0.7)',
                           color: 'white',
                           border: 'none',
                           borderRadius: '50%',
                           width: '28px',
                           height: '28px',
                           cursor: 'pointer',
                           display: 'flex',
                           alignItems: 'center',
                           justifyContent: 'center',
                           fontSize: '16px'
                        }}
                     >
                        &times;
                     </button>
                  </div>
               )}

               {/* Attributes editor inputs */}
               {(showTagInput || showLocationInput || showFeelingInput || showPlanInput) && (
                  <div className="shareMetaInputs" style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', padding: '10px 0', borderTop: '1px dashed #e2e8f0', marginTop: '10px' }}>
                     {showTagInput && (
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', backgroundColor: '#f1f5f9', padding: '4px 12px', borderRadius: '16px', fontSize: '12px' }}>
                           <span style={{ color: '#3b82f6', fontWeight: '600' }}>Tag:</span>
                           <input 
                              type="text" 
                              placeholder="Who is with you?" 
                              value={tagText} 
                              onChange={(e) => setTagText(e.target.value)}
                              style={{ border: 'none', background: 'transparent', outline: 'none', fontSize: '12px', color: '#1e293b', width: '120px' }} 
                           />
                           <span style={{ cursor: 'pointer', color: '#94a3b8' }} onClick={() => { setShowTagInput(false); setTagText(""); }}>&times;</span>
                        </div>
                     )}
                     {showLocationInput && (
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', backgroundColor: '#f1f5f9', padding: '4px 12px', borderRadius: '16px', fontSize: '12px' }}>
                           <span style={{ color: '#10b981', fontWeight: '600' }}>Location:</span>
                           <input 
                              type="text" 
                              placeholder="Where are you?" 
                              value={locationText} 
                              onChange={(e) => setLocationText(e.target.value)}
                              style={{ border: 'none', background: 'transparent', outline: 'none', fontSize: '12px', color: '#1e293b', width: '120px' }} 
                           />
                           <span style={{ cursor: 'pointer', color: '#94a3b8' }} onClick={() => { setShowLocationInput(false); setLocationText(""); }}>&times;</span>
                        </div>
                     )}
                     {showFeelingInput && (
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', backgroundColor: '#f1f5f9', padding: '4px 12px', borderRadius: '16px', fontSize: '12px' }}>
                           <span style={{ color: '#eab308', fontWeight: '600' }}>Feeling:</span>
                           <select 
                              value={feelingText} 
                              onChange={(e) => setFeelingText(e.target.value)}
                              style={{ border: 'none', background: 'transparent', outline: 'none', fontSize: '12px', color: '#1e293b', fontWeight: '600', cursor: 'pointer' }}
                           >
                              <option value="">Select...</option>
                              <option value="😊 Happy">😊 Happy</option>
                              <option value="😢 Sad">😢 Sad</option>
                              <option value="❤️ Loved">❤️ Loved</option>
                              <option value="😮 Excited">😮 Excited</option>
                              <option value="😎 Cool">😎 Cool</option>
                           </select>
                           <span style={{ cursor: 'pointer', color: '#94a3b8' }} onClick={() => { setShowFeelingInput(false); setFeelingText(""); }}>&times;</span>
                        </div>
                     )}

                     {showPlanInput && (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', width: '100%', padding: '12px', background: '#f8fafc', borderRadius: '12px', border: '1px solid #cbd5e1' }}>
                           <span style={{ fontSize: '12.5px', fontWeight: '800', color: '#8b5cf6' }}><i className="fa fa-calendar-plus"></i> CREATE PLAN</span>
                           <div style={{ display: 'flex', gap: '10px' }}>
                              <input 
                                 type="text" 
                                 placeholder="Plan Title (e.g. Weekend Cricket Match)" 
                                 value={planTitle} 
                                 onChange={(e) => setPlanTitle(e.target.value)}
                                 style={{ flex: 1, padding: '8px 12px', border: '1.5px solid #cbd5e1', borderRadius: '8px', outline: 'none', fontSize: '12.5px', color: '#1e293b' }} 
                              />
                              <input 
                                 type="date" 
                                 value={planDate} 
                                 onChange={(e) => setPlanDate(e.target.value)}
                                 style={{ padding: '8px 12px', border: '1.5px solid #cbd5e1', borderRadius: '8px', outline: 'none', fontSize: '12.5px', color: '#1e293b' }} 
                              />
                           </div>
                           <div style={{ display: 'flex', gap: '10px' }}>
                              <input 
                                 type="text" 
                                 placeholder="Location (e.g. YadavNagar Ground)" 
                                 value={planLoc} 
                                 onChange={(e) => setPlanLoc(e.target.value)}
                                 style={{ flex: 1, padding: '8px 12px', border: '1.5px solid #cbd5e1', borderRadius: '8px', outline: 'none', fontSize: '12.5px', color: '#1e293b' }} 
                              />
                              <input 
                                 type="number" 
                                 min="1"
                                 placeholder="Max Seats (e.g. 10)" 
                                 value={planCap} 
                                 onChange={(e) => setPlanCap(e.target.value)}
                                 style={{ width: '120px', padding: '8px 12px', border: '1.5px solid #cbd5e1', borderRadius: '8px', outline: 'none', fontSize: '12.5px', color: '#1e293b' }} 
                              />
                           </div>
                        </div>
                     )}
                  </div>
               )}

               <hr className="shareHr" />

               <div className="shareBottom">

                  <div className="shareOptions">
                     <label htmlFor="file-upload" className="shareOption" style={{ margin: 0 }}>
                        <i className=" fa fa-photo-video shareIcon"></i>
                        <span className="shareOptionText">Photo or Video</span>
                     </label>
                     <input 
                        type="file" 
                        accept="image/*" 
                        style={{ display: 'none' }} 
                        id="file-upload" 
                        onChange={handleImageChange} 
                     />

                     <div className="shareOption" onClick={() => setShowTagInput(prev => !prev)}>
                        <i className=" fa fa-tag shareIcon"></i>
                        <span className="shareOptionText">Tag</span>
                     </div>

                     <div className="shareOption" onClick={() => setShowLocationInput(prev => !prev)}>
                        <i className=" fa fa-map-marker shareIcon"></i>
                        <span className="shareOptionText">Location</span>
                     </div>

                     <div className="shareOption" id="shareOption" onClick={() => setShowFeelingInput(prev => !prev)}>
                        <i className=" fa fa-sad-cry shareIcon"></i>
                        <span className="shareOptionText">Feelings</span>
                     </div>

                     <div className="shareOption" onClick={() => setShowPlanInput(prev => !prev)} style={{ color: '#8b5cf6' }}>
                        <i className=" fa fa-calendar-alt shareIcon"></i>
                        <span className="shareOptionText">Plan</span>
                     </div>
                  </div>

                  <button className="shareButton" onClick={handleShare}>Share</button>
               </div>

            </div>
         </div>
      </>
   )
}

export default Share;
