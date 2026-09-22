import Link from "next/link";

export default function Navbar() {
    return (
        <nav className="navbar navbar-expand-lg  bg-success">
            <div className="container">

                <Link className="navbar-brand text-white" href="/">
                    NextShop
                </Link>

                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarNav"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div
                    className="collapse navbar-collapse"
                    id="navbarNav"
                >
                    <div className="navbar-nav ms-auto">

                        <Link className="nav-link text-white" href="/">
                            Home
                        </Link>

                        <Link className="nav-link text-white" href="/about">
                            About
                        </Link>

                         <Link className="nav-link text-white" href="/admin/products">
                                        + เพิ่มสินค้า
                        </Link>

                        <Link className="nav-link text-white" href="/contact">
                            Contact
                        </Link>

                    </div>
                </div>

            </div>
        </nav>
    );
}

