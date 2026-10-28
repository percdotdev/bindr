import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@workspace/ui/components/avatar';

interface Props {
  image: string | null | undefined;
  name: string;
  size?: 'default' | 'lg' | 'sm';
}

export function UserAvatar({ image, name, size = 'default' }: Props) {
  return (
    <Avatar size={size}>
      {image ? <AvatarImage alt={name} src={image} /> : null}
      <AvatarFallback className='font-mono uppercase'>
        {name.charAt(0)}
      </AvatarFallback>
    </Avatar>
  );
}
