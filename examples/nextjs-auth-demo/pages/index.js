import Link from "next/link";

const Index = () => (
  <div>
    <p>Hello Next.js</p>
    <Link href={"/login"}>
      <a>
        <button>Login</button>
      </a>
    </Link>
    <Link href={"/logout"}>
      <a>
        <button>Logout</button>
      </a>
    </Link>
  </div>
);

export default Index;
