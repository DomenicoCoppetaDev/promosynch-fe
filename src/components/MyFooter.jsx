import React from "react"

export default function MyFooter(){ 

return (
<footer className="${theme === 'light' ? 'bg-light' : 'bg-dark border-top border-light'}`} page-footer font-small blue pt-2 mt-5 mb-0" fixed="bottom">
    <div className="container-fluid text-md-left mt-5 {theme === 'light' ? 'bg-light' : 'bg-dark'}">
        <div className="row">
            <div className="col-md-6 mt-md-0 mt-3">
                <h5 className="text-uppercase ps-4">Promosynch</h5>
                <p className='px-4'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque, minus error corporis, quas suscipit fuga quos quibusdam quis dignissimos pariatur, quod inventore non et nihil recusandae aspernatur? Totam, vero voluptas!</p>
            </div>
            <hr className="clearfix w-100 d-md-none pb-0"/>
            <div className="col-md-3 mb-md-0 mb-3">
                <h5 className="text-uppercase">Contacs</h5>
                <ul className="list-unstyled">
                    <li><a href="#!">Email Us</a></li>
                    <li><a href="#!">Instagram</a></li>
                    <li><a href="#!">Telegram</a></li>
                    <li><a href="#!">About</a></li>
                </ul>
            </div>
            <div className="col-md-3 mb-md-0 mb-3">
                <h5 className="text-uppercase">Partners</h5>
                <ul className="list-unstyled">
                    <li><a href="#!">Collaborators</a></li>
                    <li><a href="#!">References</a></li>
                    <li><a href="#!">Press</a></li>
                    <li><a href="#!">Truspilot</a></li>
                </ul>
            </div>
        </div>
    </div>
    <div className="footer-copyright text-center mt-3 pt-3 mb-0">© 2023 Copyright:
        <a href="#"> www.promosynch.com</a>
    </div>
</footer>
)
}