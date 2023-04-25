package errors

type Unauthenticated struct{}

func (u *Unauthenticated) Error() string {
	return "Unauthenticated"
}

type Unauthorized struct{}

func (u *Unauthorized) Error() string {
	return "Unauthorized"
}