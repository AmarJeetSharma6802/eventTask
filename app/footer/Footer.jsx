import React from 'react'
import style from "../style/footer.module.css"

function Footer() {
  return (
   <div className={style.my_footer_details}>
      <div className={style.Mylogo}>
      <p>AS</p>
      </div>
      <div className={style.mydetails}>
        <div className={style.github_footer}>
        
      <a href="https://github.com/AmarJeetSharma6802" target="_blank" className={style.anchor_tag_color} >
          <span><i className="fa-brands fa-github"></i></span>
        <span className={style.awesomeFONT}>Github</span>
      </a>
        </div>
        <div className={style.LinkedIn_footer}>
     <a href="https://www.linkedin.com/in/amarjeet-sharma-full-stack/" target="_blank" className={style.anchor_tag_color}>
         <span><i className="fa-brands fa-linkedin-in"></i></span>
        <span className={style.awesomeFONT}>LinkedIn</span>
     </a>
        </div>
        <div className={style.Portfolio_footer}>
          <a href="https://portfolio-beta-dusky-34.vercel.app/" target="_blank" className={style.anchor_tag_color}>
        <span><img src="https://res.cloudinary.com/futurecoder/image/upload/v1754837549/yzxhiitouw0e2odttsip.png" alt="" className={style.portfolio_img} /></span>
         <span className={style.awesomeFONT}> Portfolio </span>
         </a>
        </div>
      </div>
    </div>
  )
}

export default Footer