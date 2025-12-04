import { HiMiniCpuChip } from "react-icons/hi2";
import { CgScreen } from "react-icons/cg";
import { FaHardDrive } from "react-icons/fa6";
import { AiFillThunderbolt } from "react-icons/ai";




const Home = () => {

  return (
    <div>
      
      <section className="container py-3">
        <div className="text-center py-5">
          <h1 className="display-4 fw-bold text-white mb-4">Build Your Dream PC</h1>
          <p className="lead text-light mb-4">Premium PC components at unbeatable prices</p>
          <a href="/products" className="btn btn-primary btn-lg px-5 py-3 fw-semibold">
            Shop Now
          </a>
        </div>

        
        <div className="row mb-5" style={{gap :"7%" , width:"100%" ,  marginLeft:15}}>

          <div className="four-box" style={{backgroundColor : "#0F172A" , borderRadius : 10 }}>
            <div className="p-4 rounded text-center h-100 hover-card">
              <HiMiniCpuChip size={50} style={{marginBottom : 20}} color="#3B82F6"/>

              <h4 className="text-white fw-semibold mb-2">CPUs</h4>
              <p className="text-light mb-0">Latest processors for peak performance</p>
            </div>
          </div>



          <div className="four-box" style={{backgroundColor : "#0F172A" , borderRadius : 10}}>
            <div className="p-4 rounded text-center h-100 hover-card">
              <CgScreen  size={50} style={{marginBottom : 20}} color="#22C55E"/>

              <h4 className="text-white fw-semibold mb-2">GPUs</h4>
              <p className="text-light mb-0">Graphics cards for gaming and creation</p>
            </div>
          </div>




          <div className="four-box" style={{backgroundColor : "#0F172A" , borderRadius : 10}}>
            <div className="p-4 rounded text-center h-100 hover-card">
              <FaHardDrive  size={50} style={{marginBottom : 20}} color="#FBBF24"/>

              <h4 className="text-white fw-semibold mb-2">Storage</h4>
              <p className="text-light mb-0">Fast SSDs and reliable HDDs</p>
            </div>
          </div>




          <div className="four-box" style={{backgroundColor : "#0F172A" , borderRadius : 10}}>
            <div className="p-4 rounded text-center h-100 hover-card">
              <AiFillThunderbolt  size={50} style={{marginBottom : 20}} color="#EF4444"/>

              <h4 className="text-white fw-semibold mb-2">Power</h4>
              <p className="text-light mb-0">Reliable PSUs for your build</p>
            </div>
          </div>



        </div>

        
        <div className="rounded p-5 text-center my-5" style={{backgroundColor : "#0F172A"}}>
          <h2 className="display-5 fw-bold text-white mb-5">Why Choose Us?</h2>
          <div className="row g-4">
            <div className="col-md-4">
              <h4 className="text-primary fw-semibold mb-3">Best Prices</h4>
              <p className="text-light mb-0">Competitive pricing on all products</p>
            </div>
            <div className="col-md-4">
              <h4 className="text-primary fw-semibold mb-3">Fast Shipping</h4>
              <p className="text-light mb-0">Quick delivery to your doorstep</p>
            </div>
            <div className="col-md-4">
              <h4 className="text-primary fw-semibold mb-3">Expert Support</h4>
              <p className="text-light mb-0">Technical assistance when you need it</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
export default Home;
