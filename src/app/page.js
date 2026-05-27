import { Avatar, Badge } from "@heroui/react";
import Image from "next/image";

export default function Home() {
  return (
    <div>
     <h1>Hello</h1>
     <Badge.Anchor>
  <Avatar />
  <Badge color="danger">5</Badge>
</Badge.Anchor>
    </div>
  );
}
